//imports
const { connect, connection } = require("mongoose");

//creates database
const connectionString = "mongodb://127.0.0.1:27017/socialNetworkDB";

//connects Mongoose and MongoDB
connect(connectionString);

//exports
module.exports = connection;
