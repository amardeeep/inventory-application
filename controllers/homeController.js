//require db queries
const db = require("../db/queries");
const getHome = async (req, res) => {
  res.render("home");
};
const getGenres = async (req, res) => {
  res.render("genres");
};
const getGames = async (req, res) => {
  const games = await db.getAllGames();
  res.render("games", { games: games });
};
module.exports = {
  getGames,
  getGenres,
  getHome,
};
