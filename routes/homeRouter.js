const { Router } = require("express");
const homeRouter = Router();
//require controllers
const {
  getHome,
  getGenres,
  getGames,
  newGame,
  postGame,
} = require("../controllers/homeController");
homeRouter.get("/", getHome);
homeRouter.get("/genres", getGenres);
homeRouter.get("/games", getGames);
homeRouter.get("/newGame", newGame);
homeRouter.post("/newGame", postGame);
module.exports = homeRouter;
