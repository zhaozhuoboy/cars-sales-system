var PicHD  = require('../models/picHD.js');
//新增图片
exports.addPic = function(req,res){
  console.log(req.body);
  var pichd = new PicHD({url:req.body.url});
  pichd.save(function(err){
    if (err) {return console.log(err)};
    res.json({msg: '发布成功'});
  })
}
