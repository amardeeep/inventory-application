//require db queries
const db = require("../db/queries");
//validation
const { body, validationResult } = require("express-validator");
const alphaErr = "must only contain letters";
const numErr = "must only contains numbers";
const empty = "cannot be empty";
const lengthErr = "must be between 1 and 10 characters";
const validateGame = [
  body("gamename")
    .trim()
    .notEmpty()
    .withMessage(`Game Name ${empty}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Game Name ${lengthErr}`),
  body("gamedesc").trim().notEmpty().withMessage(`Description ${empty}`),
  body("gameprice")
    .trim()
    .notEmpty()
    .withMessage(`Price ${empty}`)
    .isNumeric()
    .withMessage(`Price ${numErr}`),
  body("genre").notEmpty().withMessage(`Genre ${empty}`),
];
const validateGenre = [
  body("genrename")
    .trim()
    .notEmpty()
    .withMessage(`Genre Name ${empty}`)
    .isLength({ min: 1, max: 10 })
    .withMessage(`Genre Name ${lengthErr}`),
  body("description").trim().notEmpty().withMessage(`Description ${empty}`),
];
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
//display genre details
const getGenre = async (req, res) => {
  const genrename = req.params.genre;
  const genre = await db.getGenre(genrename);
  genre.game = await db.getGameForGenre(genre[0].genreid);
  res.render("genre", { title: genre[0].genrename, genre: genre });
};
//display games
const getGames = async (req, res) => {
  const games = await db.getAllGames();
  for (let game of games) {
    game.genre = await db.getGenreForGame(game.gameid);
  }
  res.render("games", { games: games });
};
// display game details
const getGame = async (req, res) => {
  const gamename = req.params.game;
  const game = await db.getGame(gamename);
  game.genre = await db.getGenreForGame(game[0].gameid);
  res.render("game", { title: game[0].gamename, game: game });
};
//display new game form and display genre to select from genres
const newGame = async (req, res) => {
  const genrenames = await db.getAllGenres();
  res.render("newGame", { genrenames: genrenames });
};

//post game details
const postGame = [
  validateGame,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const genrenames = await db.getAllGenres();
      return res
        .status(400)
        .render("newGame", { genrenames: genrenames, errors: errors.array() });
    }
    const { gamename, gamedesc, gameprice, genre } = req.body;
    await db.newGame(gamename, gamedesc, gameprice);
    await db.insertGenreForGame(gamename, genre);
    res.redirect("/games");
  },
];
//display genre form
const newGenre = (req, res) => {
  res.render("newGenre");
};

//post genre details
const postGenre = [
  validateGenre,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("newGenre", { errors: errors.array() });
    }
    const { genrename, description } = req.body;
    await db.newGenre(genrename, description);
    res.redirect("/genres");
  },
];

//delete genre
const deleteGenre = async (req, res) => {
  const genrename = req.params.genrename;
  await db.deleteFromgenre(genrename);
  await db.deleteGenre(genrename);
  res.redirect("/genres");
};

const deleteGame = async (req, res) => {
  const gamename = req.params.gamename;
  await db.deleteFromgame(gamename);
  await db.deleteGame(gamename);
  res.redirect("/games");
};

//update game

//update genre
const updateGenreGet = (req, res) => {
  res.render();
};
const updateGenrePost = [validateGenre, async (req, res) => {}];
module.exports = {
  getGames,
  getGame,
  getGenres,
  getGenre,
  getHome,
  newGame,
  postGame,
  newGenre,
  postGenre,
  deleteGenre,
  deleteGame,
};
