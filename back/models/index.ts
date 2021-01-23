import { Sequelize } from "sequelize-typescript";
import Comment from "./comment";
import Hashtag from "./hashtag";
import Image from "./image";
import Post from "./post";
import User from "./user";
const env = process.env.NODE_ENV || "development";
const config = require("../config/config")[env];
const db: any = {
  Comment: Comment,
  Hashtag: Hashtag,
  Image: Image,
  Post: Post,
  User: User,
};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const models = db.sequelize.models;
export default db;
