import db from "../models";

const { User, Post, Image, Comment } = db.sequelize.models;

class PostService {
  private static _post;
  static get post() {
    return PostService._post;
  }

  async getFullPost(id: number) {
    return await Post.findOne({
      where: { id },
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
  }

  async getPostById(id: number) {
    return await Post.findOne({
      where: { id },
    });
  }
}

export default PostService;
