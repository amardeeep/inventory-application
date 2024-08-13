#! /usr/bin/env node

const { Client } = require("pg");
const { ROLE_NAME, ROLE_PWD } = require("../config");
//this script was uses for practicing and understanding how to handle many may relations. it will be edited later.
const SQL = `
CREATE TABLE IF NOT EXISTS games (
  gameid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gamename VARCHAR ( 255 ),
  description VARCHAR ( 500 ),
  price FLOAT
);

INSERT INTO games (gamename,description,price) 
VALUES
  ('GTA 5','Grand Theft Auto V is an action-adventure game played from either a third-person or first-person perspective. Players complete missions—linear scenarios with set objectives—to progress through the story. Outside of the missions, players may freely roam the open world.',54.99),
  ('Half-Life','Half-Life is a first-person shooter that requires the player to perform combat tasks and puzzle solving to advance through the game.',25.55),
  ('Sekiro','Sekiro: Shadows Die Twice is an intense, third-person, action-adventure set against the bloody backdrop of 14th-century Japan. Step into the role of a disgraced warrior brought back from the brink of death whose mission is to rescue his master and exact revenge on his arch nemesis.',99.99);

CREATE TABLE IF NOT EXISTS genre (
  genreid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  genrename VARCHAR ( 255 ),
  description VARCHAR (500) 
);
INSERT INTO genre (genrename,description)
VALUES 
  ('FPS','An FPS game is a type of action game where the player views everything from a first-person perspective.'),
  ('Action RPG','Action RPGs give the player realtime control over game characters, usually this is most noticeable in regards to movement and combat. '),
  ('Tactical Shooter','W.I.P.'),
  ('Horror','W.I.P.');


`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${ROLE_NAME}:${ROLE_PWD}@localhost:5432/inv`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
