import { DataType, Model } from "sequelize-typescript";

class Image extends Model {
  static init(sequelize) {
    return super.init(
      {
        src: {
          type: DataType.STRING(200),
          allowNull: false,
        },
      },
      {
        modelName: "Image",
        tableName: "images",
        charset: "utf8",
        collate: "utf8_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Image.belongsTo(db.Post);
  }
}

export default Image;
