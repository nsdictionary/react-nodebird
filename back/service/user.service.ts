import db from "../models";
import * as bcrypt from "bcrypt";
import { createUserInput } from "../dtos/user.dto";

const { User, Post } = db.sequelize.models;

class UserService {
  private readonly _saltRounds = 12;

  private static _user;
  static get user() {
    return UserService._user;
  }

  async register({ email, password, nickname }: createUserInput) {
    const hashedPassword = await bcrypt.hash(password, this._saltRounds);
    return await User.create({
      email: email,
      nickname: nickname,
      password: hashedPassword,
    });
  }

  async getUserById(id: number) {
    return await User.findOne({
      where: { id },
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
  }
}

export default UserService;
