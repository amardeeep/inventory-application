#! /usr/bin/env node

const { Client } = require("pg");
const { ROLE_NAME, ROLE_PWD } = require("../config");

const SQL = `
CREATE TABLE IF NOT EXISTS games (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  gamename VARCHAR ( 255 )
);

INSERT INTO games (gamename) 
VALUES
  ('GTA 5'),
  ('Half-Life'),
  ('Sekiro');
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${ROLE_NAME}:${ROLE_PWD}@localhost:5432/inventory`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
