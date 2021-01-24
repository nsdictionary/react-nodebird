import { Router } from "express";
import * as express from "express";
import * as passport from "passport";
import db from "../models";
import UserService from "../service/user.service";

const router = Router();
const { Post, Image, Comment, User, Hashtag } = db.sequelize.models;
const { isLoggedIn, isNotLoggedIn } = require("./middlewares");
const userService = new UserService();

router.get(
  "/",
  async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
      if (req.user) {
        const fullUserWithoutPassword = await userService.getFullUserData(
          req.user.id
        );
        res.status(200).json(fullUserWithoutPassword);
      } else {
        res.status(200).json(null);
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/",
  isNotLoggedIn,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const exUser = await userService.getUserByEmail(req.body.email);
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

        const fullUserWithoutPassword = await userService.getFullUserData(
          user.id
        );
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

router.patch(
  "/nickname",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
      await User.update(
        {
          nickname: req.body.nickname,
        },
        {
          where: { id: req.user.id },
        }
      );
      res.status(200).json({ nickname: req.body.nickname });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
