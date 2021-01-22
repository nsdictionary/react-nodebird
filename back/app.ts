import * as express from "express";
import * as cors from "cors";
const app = express();

app.use(
  cors({
    origin: "http://localhost:3060",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("hello express");
});

app.use("/user", require("./routes/user"));

app.listen(3065, () => {
  console.log("서버 실행 중!");
});
