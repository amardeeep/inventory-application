const { Router } = require("express");
const homeRouter = Router();
//require controllers
const {
  getHome,
  getGenres,
  getGames,
  newGame,
  postGame,
  newGenre,
  postGenre,
  deleteGenre,
  deleteGame,
} = require("../controllers/homeController");
homeRouter.get("/", getHome);
homeRouter.get("/genres", getGenres);
homeRouter.get("/games", getGames);
homeRouter.get("/newGame", newGame);
homeRouter.post("/newGame", postGame);
homeRouter.get("/newGenre", newGenre);
homeRouter.post("/newGenre", postGenre);
homeRouter.get("/:genrename/deleteGenre", deleteGenre);
homeRouter.get("/:gamename/deleteGame", deleteGame);
module.exports = homeRouter;
