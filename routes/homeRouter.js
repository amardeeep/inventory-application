const { Router } = require("express");
const homeRouter = Router();
//require controllers
const {
  getHome,
  getGenres,
  getGames,
} = require("../controllers/homeController");
homeRouter.get("/", getHome);
homeRouter.get("/genres", getGenres);
homeRouter.get("/games", getGames);
module.exports = homeRouter;
