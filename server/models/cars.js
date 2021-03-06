var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CarsSchema = new Schema(
  {
    name: String,
    userName: String,
    carName: String,
    phone:String,
    carPrice: String,
    carPics:Array,
    carStock:String,//库存
    carDescription:String//汽车描述
  },
  {
      timestamps: true
  }
)

module.exports = mongoose.model('Car', CarsSchema);
