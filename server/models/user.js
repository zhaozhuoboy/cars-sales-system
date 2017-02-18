var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    name: String,
    userName: String,
    password: String,
    isManager: String
  }
)

module.exports = mongoose.model('User', UserSchema);
