const dotenv = require("dotenv");
dotenv.config();
module.exports = {
  PORT: parseInt(process.env.PORT),
  ROLE_NAME: process.env.ROLE_NAME,
  ROLE_PWD: process.env.ROLE_PWD,
};
