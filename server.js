//imports
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

//sets the port for the server
const PORT = process.env.PORT || 3001;
const app = express();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

//allows server to listen and start once database connection is open
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});