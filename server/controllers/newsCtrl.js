var New = require('../models/news.js');

exports.getNews = function(req,res){
  const pageNum = req.body.pageNum;
  const pageSize = req.body.pageSize;
  var count = 0;
  New.count({},function(err,datalength){
    try{
      count=datalength;
    }catch(err){
      console.log(err);
    }
  });
  New.find({}).sort({'_id':-1}).skip(pageNum*pageSize-pageSize).limit(pageSize).exec(function(err,doc){
    //console.log(doc);
    try{
      res.json({news:doc,dataLength:count})
    }catch(err){
      res.json({error:"查找失败"})
    }
  })
}

exports.deleteNews = function(req,res){
  var _id = req.params._id;
  New.findByIdAndRemove(_id,function (err) {
    if (err) {return console.log(err)};
    res.json({msg:'删除成功'})
  })
}
exports.getOneNew = function(req,res){
  var _id =req.params._id;
  console.log(_id);
  New.findById(_id,function(err,doc){
    if (err) {return console.log(err)};
    res.json(doc);
  })
}
exports.updateNews = function(req,res){
  var _id =req.params._id;
  console.log(_id);
  console.log(req.body);
  New.findByIdAndUpdate(_id,req.body,function(err,doc){
    if (err) {return console.log(err)};
    res.json({msg: '修改成功啦！'});
  })
}
