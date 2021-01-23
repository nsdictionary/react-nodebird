import db from "../models";

const { User, Post, Image, Comment, Hashtag } = db.sequelize.models;

class PostService {
  async createPost(UserId: number, content: string) {
    return await Post.create({
      content,
      UserId,
    });
  }

  async createHashtags(hashtags: string[]) {
    return await Promise.all(
      hashtags.map((tag: string) =>
        Hashtag.findOrCreate({
          where: { name: tag.slice(1).toLowerCase() },
        })
      )
    ); // [[노드, true], [리액트, true]]
  }

  async createImage(image: string) {
    return await Image.create({ src: image });
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

  async createComment(UserId, PostId, content) {
    return await Comment.create({
      content,
      PostId,
      UserId,
    });
  }

  async getFullComment(commentId: number) {
    return await Comment.findOne({
      where: { id: commentId },
      include: [
        {
          model: User,
          attributes: ["id", "nickname"],
        },
      ],
    });
  }
}

export default PostService;
