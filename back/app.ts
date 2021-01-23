import * as express from "express";
import * as cors from "cors";
import * as passport from "passport";
import * as session from "express-session";
import * as cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import db from "./models";

const app = express();
const passportConfig = require("./passport");

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
