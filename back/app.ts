import * as express from "express";
import * as cors from "cors";
import * as passport from "passport";

const db = require("./models");
const app = express();

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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/user", require("./routes/user"));
app.use("/post", require("./routes/post"));

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
