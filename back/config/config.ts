import * as dotenv from "dotenv";
dotenv.config();

module.exports = {
  development: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "react-nodebird",
    host: "127.0.0.1",
    port: "8889",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "react-nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: process.env.DB_PASSWORD,
    database: "react-nodebird",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};