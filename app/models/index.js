const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const db = {};
db.mongoose = mongoose;

// Models
db.user = require("./user.model");
db.role = require("./role.model");
db.animal = require("./animal.model");

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;
