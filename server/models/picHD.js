var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PicHDSchema = new Schema(
  {
    url: String,
  },
  {
      timestamps: true
  }
)

module.exports = mongoose.model('PicHD', PicHDSchema);
