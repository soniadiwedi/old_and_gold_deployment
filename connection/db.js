const mongoose = require("mongoose");
require("dotenv").config()

//this database connection is made with the help of mongoose Mongodb_Url
//and that will help to connect with databse and help in store our data in database
const connection = mongoose.connect(process.env.URL);
module.exports = { connection };