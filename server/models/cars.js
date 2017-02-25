var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarsSchema = new Schema(
  {
    name: String,
    userName: String,
    carName: String,
    carPrice: String,
    carPics:Array,
    carStock:String,//库存
    carDescription:String//汽车描述
  }
)

module.exports = mongoose.model('Car', CarsSchema);
