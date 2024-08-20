const { Router } = require("express");
const homeRouter = Router();
//require controllers
const {
  getHome,
  getGenres,
  getGenre,
  getGames,
  getGame,
  newGame,
  postGame,
  newGenre,
  postGenre,
  deleteGenre,
  deleteGame,
  updateGameGet,
} = require("../controllers/homeController");

homeRouter.get("/", getHome);
homeRouter.get("/genres", getGenres);
homeRouter.get("/genres/:genre", getGenre);
homeRouter.get("/games", getGames);
homeRouter.get("/games/:game", getGame);
homeRouter.get("/newGame", newGame);
homeRouter.post("/newGame", postGame);
homeRouter.get("/newGenre", newGenre);
homeRouter.post("/newGenre", postGenre);
homeRouter.get("/:genrename/deleteGenre", deleteGenre);
homeRouter.get("/:gamename/deleteGame", deleteGame);
homeRouter.get("/:gamename/updateGame", updateGameGet);
module.exports = homeRouter;
