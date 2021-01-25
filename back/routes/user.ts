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

router.patch(
  "/:userId/follow",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // PATCH /user/1/follow
    try {
      const user = await User.findOne({ where: { id: req.params.userId } });
      if (!user) {
        res.status(403).send("없는 사람을 팔로우하려고 하시네요?");
      }
      await user.addFollowers(req.user.id);
      res.status(200).json({
        UserId: parseInt(req.params.userId, 10),
        nickname: user.nickname,
      });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/:userId/follow",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // DELETE /user/1/follow
    try {
      const user = await User.findOne({ where: { id: req.params.userId } });
      if (!user) {
        res.status(403).send("없는 사람을 언팔로우하려고 하시네요?");
      }
      await user.removeFollowers(req.user.id);
      res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/follower/:userId",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // DELETE /user/follower/2
    try {
      const user = await User.findOne({ where: { id: req.params.userId } });
      if (!user) {
        res.status(403).send("없는 사람을 차단하려고 하시네요?");
      }
      await user.removeFollowings(req.user.id);
      res.status(200).json({ UserId: parseInt(req.params.userId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/followers",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // GET /user/followers
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        res.status(403).send("없는 사람을 찾으려고 하시네요?");
      }
      const followers = await user.getFollowers();
      res.status(200).json(followers);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/followings",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // GET /user/followings
    try {
      const user = await User.findOne({ where: { id: req.user.id } });
      if (!user) {
        res.status(403).send("없는 사람을 찾으려고 하시네요?");
      }
      const followings = await user.getFollowings();
      res.status(200).json(followings);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.get(
  "/:id",
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // GET /user/3
    try {
      const fullUserWithoutPassword = await User.findOne({
        where: { id: req.params.id },
        attributes: {
          exclude: ["password"],
        },
        include: [
          {
            model: Post,
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followings",
            attributes: ["id"],
          },
          {
            model: User,
            as: "Followers",
            attributes: ["id"],
          },
        ],
      });
      if (fullUserWithoutPassword) {
        const data = fullUserWithoutPassword.toJSON();
        data.Posts = data.Posts.length;
        data.Followings = data.Followings.length;
        data.Followers = data.Followers.length;
        res.status(200).json(data);
      } else {
        res.status(404).json("존재하지 않는 사용자입니다.");
      }
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
