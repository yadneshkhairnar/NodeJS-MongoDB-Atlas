const dbconfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbconfig.url;
db.posts = require("./posts.model.js")(mongoose);

module.exports = db;