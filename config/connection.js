const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.tech_blog,
  process.env.user,
  process.env.password,
  {
    host: process.env.localhost,
    dialect: process.env.postgres,
    port: 5432,
  }
);

module.exports = sequelize;

