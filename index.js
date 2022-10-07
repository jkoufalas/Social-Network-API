const express = require("express");
//expressJS include
const db = require("./config/connection");
//database connection
const routes = require("./routes");
//import routes

const PORT = 3001;
const app = express();
//setup port and express

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
//use the express routes and setup json format and urlencoded

//connect to db and listen for middleware within database call
db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
