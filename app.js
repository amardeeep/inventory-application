const express = require("express");
const app = express();
const path = require("path");
const { PORT } = require("./config");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));

const homeRouter = require("./routes/homeRouter");

app.use("/", homeRouter);

app.listen(PORT, () => {
  console.log(`Express app running on port : ${PORT} `);
});
