const pool = require("./pool");
//read games
async function getAllGames() {
  const { rows } = await pool.query("select * from games");
  return rows;
}
async function getGenreForGame(gameid) {
  const { rows } = await pool.query(`select genre.genrename from genre
join game_genre on genre.genreid=game_genre.genreid
join games on game_genre.gameid=games.gameid
where games.gameid=${gameid};`);
  return rows;
}
//read genres
async function getAllGenres() {
  const { rows } = await pool.query("select * from genre");
  return rows;
}
async function getGameForGenre(genreid) {
  const { rows } = await pool.query(`select games.gamename from games
    join game_genre on games.gameid=game_genre.gameid
    join genre on game_genre.genreid=genre.genreid
    where genre.genreid=${genreid};`);
  return rows;
}

//create game
async function newGame(gamename, gamedesc, gameprice) {
  await pool.query(
    `insert into games (gamename,description,price) values ($1,$2,$3)`,
    [gamename, gamedesc, gameprice]
  );
}
//create genre
//delete game
//delete genre
//update game
//update genre
module.exports = {
  getAllGames,
  getAllGenres,
  getGenreForGame,
  getGameForGenre,
  newGame,
};
