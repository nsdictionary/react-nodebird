import { Router } from "express";
import * as express from "express";
import * as multer from "multer";
import db from "../models";
import PostService from "../service/post.service";

const path = require("path");
const fs = require("fs");
const router = Router();

const { Post, Image, Comment, User, Hashtag } = db.sequelize.models;
const { isLoggedIn } = require("./middlewares");
const postService = new PostService();

try {
  fs.accessSync("uploads");
} catch (error) {
  console.log("uploads 폴더가 없으므로 생성합니다.");
  fs.mkdirSync("uploads");
}

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "uploads");
    },
    filename(req, file, done) {
      // 제로초.png
      const ext = path.extname(file.originalname); // 확장자 추출(.png)
      const basename = path.basename(file.originalname, ext); // 제로초
      done(null, basename + "_" + new Date().getTime() + ext); // 제로초15184712891.png
    },
  }),
  limits: { fileSize: 20 * 1024 * 1024 }, // 20MB
});

router.post(
  "/",
  isLoggedIn,
  upload.none(),
  async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
      const hashtags = req.body.content.match(/#[^\s#]+/g);
      const post = await postService.createPost(req.user.id, req.body.content);
      if (hashtags) {
        const result = await postService.createHashtags(hashtags);
        await post.addHashtags(result.map((v) => v[0]));
      }
      if (req.body.image) {
        if (Array.isArray(req.body.image)) {
          // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
          const images = await Promise.all(
            req.body.image.map((image) => postService.createImage(image))
          );
          await post.addImages(images);
        } else {
          // 이미지를 하나만 올리면 image: 제로초.png
          const image = await postService.createImage(req.body.image);
          await post.addImages(image);
        }
      }

      const fullPost = await postService.getFullPost(post.id);
      res.status(201).json(fullPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/images",
  isLoggedIn,
  upload.array("image"),
  (req: any, res: express.Response, next: express.NextFunction) => {
    console.log(req.files);
    res.json(req.files.map((v) => v.filename));
  }
);

router.get(
  "/:postId",
  async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
        include: [
          {
            model: User,
            attributes: ["id", "nickname"],
          },
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["id", "nickname"],
                order: [["createdAt", "DESC"]],
              },
            ],
          },
          {
            model: User, // 좋아요 누른 사람
            as: "Likers",
            attributes: ["id"],
          },
        ],
      });
      res.status(200).json(post);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/:postId/retweet",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // POST /post/1/retweet
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
        include: [
          {
            model: Post,
            as: "Retweet",
          },
        ],
      });
      if (!post) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }
      if (
        req.user.id === post.UserId ||
        (post.Retweet && post.Retweet.UserId === req.user.id)
      ) {
        return res.status(403).send("자신의 글은 리트윗할 수 없습니다.");
      }
      const retweetTargetId = post.RetweetId || post.id;
      const exPost = await Post.findOne({
        where: {
          UserId: req.user.id,
          RetweetId: retweetTargetId,
        },
      });
      if (exPost) {
        return res.status(403).send("이미 리트윗했습니다.");
      }
      const retweet = await Post.create({
        UserId: req.user.id,
        RetweetId: retweetTargetId,
        content: "retweet",
      });
      const retweetWithPrevPost = await Post.findOne({
        where: { id: retweet.id },
        include: [
          {
            model: Post,
            as: "Retweet",
            include: [
              {
                model: User,
                attributes: ["id", "nickname"],
              },
              {
                model: Image,
              },
            ],
          },
          {
            model: User,
            attributes: ["id", "nickname"],
          },
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User,
                attributes: ["id", "nickname"],
              },
            ],
          },
          {
            model: User,
            as: "Likers",
            attributes: ["id"],
          },
        ],
      });
      res.status(201).json(retweetWithPrevPost);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.post(
  "/:postId/comment",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    try {
      const post = await postService.getPostById(req.params.postId);
      if (!post) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }
      const comment = await postService.createComment(
        req.user.id,
        parseInt(req.params.postId, 10),
        req.body.content
      );
      const fullComment = await postService.getFullComment(comment.id);

      res.status(201).json(fullComment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.patch(
  "/:postId/like",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // PATCH /post/1/like
    try {
      const post = await postService.getPostById(req.params.postId);
      if (!post) {
        return res.status(403).send("게시글이 존재하지 않습니다.");
      }
      await post.addLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/:postId/like",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // DELETE /post/1/like
    try {
      const post = await postService.getPostById(req.params.postId);
      if (!post) {
        return res.status(403).send("게시글이 존재하지 않습니다.");
      }
      await post.removeLikers(req.user.id);
      res.json({ PostId: post.id, UserId: req.user.id });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

router.delete(
  "/:postId",
  isLoggedIn,
  async (req: any, res: express.Response, next: express.NextFunction) => {
    // DELETE /post/10
    try {
      await Post.destroy({
        where: {
          id: req.params.postId,
          UserId: req.user.id,
        },
      });
      res.status(200).json({ PostId: parseInt(req.params.postId, 10) });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
