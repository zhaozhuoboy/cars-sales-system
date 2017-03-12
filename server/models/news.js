var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NewSchema = new Schema(
  {
    title: String,
    author: String,
    news_content: String
  },
  {
      timestamps: true
  }
)

module.exports = mongoose.model('New', NewSchema);
