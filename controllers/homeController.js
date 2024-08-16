//require db queries
const db = require("../db/queries");

//display home
const getHome = async (req, res) => {
  res.render("home");
};

//display genres
const getGenres = async (req, res) => {
  const genres = await db.getAllGenres();
  for (let genre of genres) {
    genre.game = await db.getGameForGenre(genre.genreid);
  }
  res.render("genres", { genres: genres });
};

//display games
const getGames = async (req, res) => {
  const games = await db.getAllGames();
  for (let game of games) {
    game.genre = await db.getGenreForGame(game.gameid);
  }
  res.render("games", { games: games });
};

//display new game form and display genre to select from genres
const newGame = async (req, res) => {
  const genrenames = await db.getAllGenres();
  res.render("newGame", { genrenames: genrenames });
};

//post game details
const postGame = async (req, res) => {
  const { gamename, gamedesc, gameprice, genre } = req.body;
  await db.newGame(gamename, gamedesc, gameprice);
  await db.genreForGame(gamename, genre);
  res.redirect("/games");
};

//display genre form
const newGenre = (req, res) => {
  res.render("newGenre");
};

//post genre details
const postGenre = async (req, res) => {
  const { genrename, description } = req.body;
  await db.newGenre(genrename, description);
  res.redirect("/genres");
};
module.exports = {
  getGames,
  getGenres,
  getHome,
  newGame,
  postGame,
  newGenre,
  postGenre,
};
