import { DataType, Model } from "sequelize-typescript";

class Comment extends Model {
  static init(sequelize) {
    return super.init(
      {
        content: {
          type: DataType.TEXT,
          allowNull: false,
        },
        // UserId: 1
        // PostId: 3
      },
      {
        modelName: "Comment",
        tableName: "comments",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  }
}

export default Comment;
