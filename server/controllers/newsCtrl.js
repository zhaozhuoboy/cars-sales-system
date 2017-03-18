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
  New.find({}).skip(pageNum*pageSize-pageSize).limit(pageSize).exec(function(err,doc){
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
