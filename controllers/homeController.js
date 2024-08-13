//require db queries
exports.getHome = (req, res) => {
  res.render("home");
};
exports.getGenres = (req, res) => {
  res.render("genres");
};
exports.getGames = (req, res) => {
  res.render("games");
};
