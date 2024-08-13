const pool = require("./pool");
//read games
async function getAllGames() {
  const { rows } = await pool.query("select * from games");
  return rows;
}
//read genres
//create game
//create genre
//delete game
//delete genre
//update game
//update genre
module.exports = { getAllGames };
