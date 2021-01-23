import { Router } from "express";
const router = Router();

router.get("/test", (req, res, next) => {
  res.send("test");
});

module.exports = router;
