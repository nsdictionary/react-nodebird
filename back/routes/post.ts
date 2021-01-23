import { Router } from "express";
import * as express from "express";
import * as multer from "multer";
import db from "../models";

const path = require("path");
const fs = require("fs");
const router = Router();

const { Post, Image, Comment, User, Hashtag } = db.sequelize.models;
const { isLoggedIn } = require("./middlewares");

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

interface IRequest extends express.Request {
  user: any;
}
router.post(
  "/",
  isLoggedIn,
  upload.none(),
  async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const hashtags = req.body.content.match(/#[^\s#]+/g);
      const post = await Post.create({
        content: req.body.content,
        UserId: req.user.id,
      });
      if (hashtags) {
        const result = await Promise.all(
          hashtags.map((tag) =>
            Hashtag.findOrCreate({
              where: { name: tag.slice(1).toLowerCase() },
            })
          )
        ); // [[노드, true], [리액트, true]]
        await post.addHashtags(result.map((v) => v[0]));
      }
      if (req.body.image) {
        if (Array.isArray(req.body.image)) {
          // 이미지를 여러 개 올리면 image: [제로초.png, 부기초.png]
          const images = await Promise.all(
            req.body.image.map((image) => Image.create({ src: image }))
          );
          await post.addImages(images);
        } else {
          // 이미지를 하나만 올리면 image: 제로초.png
          const image = await Image.create({ src: req.body.image });
          await post.addImages(image);
        }
      }
      const fullPost = await Post.findOne({
        where: { id: post.id },
        include: [
          {
            model: Image,
          },
          {
            model: Comment,
            include: [
              {
                model: User, // 댓글 작성자
                attributes: ["id", "nickname"],
              },
            ],
          },
          {
            model: User, // 게시글 작성자
            attributes: ["id", "nickname"],
          },
          {
            model: User, // 좋아요 누른 사람
            as: "Likers",
            attributes: ["id"],
          },
        ],
      });
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
  async (req: IRequest, res: express.Response, next: express.NextFunction) => {
    try {
      const post = await Post.findOne({
        where: { id: req.params.postId },
      });
      if (!post) {
        return res.status(403).send("존재하지 않는 게시글입니다.");
      }
      const comment = await Comment.create({
        content: req.body.content,
        PostId: parseInt(req.params.postId, 10),
        UserId: req.user.id,
      });
      const fullComment = await Comment.findOne({
        where: { id: comment.id },
        include: [
          {
            model: User,
            attributes: ["id", "nickname"],
          },
        ],
      });
      res.status(201).json(fullComment);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
);

module.exports = router;
