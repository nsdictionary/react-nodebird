import { Router } from "express";
import * as express from "express";
import * as passport from "passport";
import UserService from "../service/user.service";
import db from "../models";

const router = Router();

const { User, Post } = db.sequelize.models;
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const userService = new UserService();

router.post(
  "/",
  isNotLoggedIn,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const exUser = await User.findOne({
        where: {
          email: req.body.email,
        },
      });
      if (exUser) {
        return res.status(403).send("이미 사용 중인 아이디입니다.");
      }
      const user = await userService.register(req.body);
      res.status(201).send("ok");
    } catch (error) {
      console.error(error);
      next(error); // status 500
    }
  }
);

router.post(
  "/login",
  isNotLoggedIn,
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        console.error(err);
        return next(err);
      }
      if (info) {
        return res.status(401).send(info.reason);
      }
      return req.login(user, async (loginErr) => {
        if (loginErr) {
          console.error(loginErr);
          return next(loginErr);
        }

        const fullUserWithoutPassword = await userService.getUserById(user.id);
        return res.status(200).json(fullUserWithoutPassword);
      });
    })(req, res, next);
  }
);

router.post(
  "/logout",
  isLoggedIn,
  (req: express.Request, res: express.Response) => {
    req.logout();
    req.session.destroy(null);
    res.send("ok");
  }
);

module.exports = router;
