const { connect, connection } = require("mongoose");

//mongoDB connection string, to database socialNetwork
connect("mongodb://localhost/socialNetwork", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
