import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST!,
    dialect: "postgres",
    logging: false
  }
);

import "../models";

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully!");

    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log(error);
  }
};
