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
async function genreForGame(gamename, genreid) {
  const gameid = await pool.query(
    `select gameid from games where games.gamename like '${gamename}'`
  );
  for (let row of genreid) {
    await pool.query(`insert into game_genre (gameid,genreid) values ($1,$2)`, [
      gameid.rows[0].gameid,
      parseInt(row),
    ]);
  }
}
//create genre
async function newGenre(genrename, description) {
  await pool.query(`insert into genre (genrename,description) values ($1,$2)`, [
    genrename,
    description,
  ]);
}
//delete game
//delete genre
async function deleteGenre(genrename) {
  await pool.query(
    `delete from genre where genre.genrename like '${genrename}'`
  );
}
//update game
//update genre
module.exports = {
  getAllGames,
  getAllGenres,
  getGenreForGame,
  getGameForGenre,
  newGame,
  newGenre,
  genreForGame,
  deleteGenre,
};
