var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    userName: String,
    password: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', UserSchema);
