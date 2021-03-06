import * as express from "express";
import * as cors from "cors";
import * as passport from "passport";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import * as morgan from "morgan";
import db from "./models";

const path = require("path");
const passportConfig = require("./passport");
const app = express();

dotenv.config();

db.sequelize
  .sync()
  .then(() => {
    console.log("db 연결 성공");
  })
  .catch(console.error);

app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);

passportConfig();
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));
app.use("/posts", require("./routes/posts"));
app.use("/hashtag", require("./routes/hashtag"));

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
