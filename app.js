const express = require("express");
const app = express();
const path = require("path");
const { PORT } = require("./config");

app.listen(PORT, () => {
  console.log(`Express app running on port : ${PORT} `);
});
