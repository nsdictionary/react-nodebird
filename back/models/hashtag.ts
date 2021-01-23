import { DataType, Model } from "sequelize-typescript";

module.exports = class Hashtag extends Model {
  static init(sequelize) {
    return super.init(
      {
        name: {
          type: DataType.STRING(20),
          allowNull: false,
        },
      },
      {
        modelName: "Hashtag",
        tableName: "hashtags",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci", // 이모티콘 저장
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Hashtag.belongsToMany(db.Post, { through: "PostHashtag" });
  }
};
