const { Pool } = require("pg");
const { ROLE_NAME, ROLE_PWD } = require("../config");
module.exports = new Pool({
  connectionString: `postgresql://${ROLE_NAME}:${ROLE_PWD}@localhost:5432/inv`,
});
