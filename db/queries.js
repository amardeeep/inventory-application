const pool = require("./pool");
//read games
async function getAllGames() {
  const { rows } = await pool.query("select * from games");
  return rows;
}
async function getGame(gamename) {
  const { rows } = await pool.query(
    `select * from games where games.gamename like '${gamename}'`
  );
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
async function getGenreId(id) {
  const { rows } = await pool.query(
    `select * from genre where genre.genreid =${id}`
  );
  return rows;
}
async function getAllGenres() {
  const { rows } = await pool.query("select * from genre");
  return rows;
}
//read a genre
async function getGenre(genrename) {
  const { rows } = await pool.query(
    `select * from genre where genre.genrename like '${genrename}'`
  );
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
async function insertGenreForGame(gamename, genreid) {
  const gameid = await pool.query(
    `select gameid from games where games.gamename like '${gamename}'`
  );
  if (Array.isArray(genreid)) {
    for (let row of genreid) {
      await pool.query(
        `insert into game_genre (gameid,genreid) values ($1,$2)`,
        [gameid.rows[0].gameid, parseInt(row)]
      );
    }
  } else {
    await pool.query(`insert into game_genre (gameid,genreid) values($1,$2)`, [
      gameid.rows[0].gameid,
      parseInt(genreid),
    ]);
  }
}
// write a function to update genres fro a game
//create genre
async function newGenre(genrename, description) {
  await pool.query(`insert into genre (genrename,description) values ($1,$2)`, [
    genrename,
    description,
  ]);
}
//delete game
async function deleteGame(gamename) {
  await pool.query(`delete from games where games.gamename like '${gamename}'`);
}
//delete genre
async function deleteGenre(genrename) {
  await pool.query(
    `delete from genre where genre.genrename like '${genrename}'`
  );
}
async function deleteFromgenre(genrename) {
  const genreid = await pool.query(
    `select genreid from genre where genre.genrename like '${genrename}'`
  );
  await pool.query(`
    delete from game_genre where game_genre.genreid=${genreid.rows[0].genreid}`);
}
async function deleteFromgame(gamename) {
  const gameid = await pool.query(
    `select gameid from games where games.gamename like '${gamename}'`
  );
  await pool.query(`
    delete from game_genre where game_genre.gameid=${gameid.rows[0].gameid}`);
}
//update game

//update genre
async function updateGenre(genreid, genrename, genredesc) {
  await pool.query(
    `update genre set (genrename,description)=($1,$2) where genreid=${genreid}`,
    [genrename, genredesc]
  );
}
module.exports = {
  getAllGames,
  getGame,
  getAllGenres,
  getGenre,
  getGenreId,
  getGenreForGame,
  getGameForGenre,
  newGame,
  newGenre,
  insertGenreForGame,
  deleteGenre,
  deleteGame,
  deleteFromgenre,
  deleteFromgame,
  updateGenre,
};
