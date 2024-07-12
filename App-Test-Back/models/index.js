import { ENV } from "../configs/envConfig.js";
import { Sequelize } from "sequelize";
import authorModel from "./author.model.js";
import bookModel from "./book.model.js";

const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USER, ENV.DB_PASSWORD, {
  host: ENV.DB_HOST,
  dialect: ENV.DB_TYPE,
  logging: false,
});
try {
  await sequelize.authenticate();
  console.log("Connection to DB succeed");
} catch (error) {
  console.log(error);
}

authorModel(sequelize, Sequelize);
bookModel(sequelize, Sequelize);

const { Author, Book } = sequelize.models;

Author.hasMany(Book, {
  as: "books",
  foreignKey: { allowNull: false },
  onDelete: "CASCADE",
});
Book.belongsTo(Author);

try {
  await sequelize.sync({ alter: true, force: true });
  console.log("Sync ok");
} catch (error) {
  console.log(error);
}

export { Author, Book };
