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

module.exports = router;
