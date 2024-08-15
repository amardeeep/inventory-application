//require db queries
const db = require("../db/queries");
const getHome = async (req, res) => {
  res.render("home");
};
const getGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  for (let genre of genres) {
    genre.game = await db.getGameForGenre(genre.genreid);
  }
  res.render("genres", { genres: genres });
};
const getGames = async (req, res) => {
  const games = await db.getAllGames();
  for (let game of games) {
    game.genre = await db.getGenreForGame(game.gameid);
  }
  res.render("games", { games: games });
};
module.exports = {
  getGames,
  getGenres,
  getHome,
};
