var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var mongoose = require('mongoose');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// 关闭同源策略
var cors = require('cors');
app.use(cors());

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/cars-sales-system');

var User = require('./models/user');//user表的结构
var Cars = require('./models/cars');
//连接数据库
var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('数据库连接成功！!')
});

//登录api
app.post('/login',function(req,res){
  User.findOne({userName:req.body.userName},function(err,document){
      try{
        if(req.body.password == document.password){
          if(document.isManager == 'y'){
            res.json({isManager:'y',msg:'success'});
          }else{
            res.json({isManager:'n',msg:'success'})
          }
        }else{
          res.json({error:'用户名或密码错误！'});
        }
      }catch(err){
        res.json({error:'用户名不存在！'});
      }

  })
})

//添加新员工
app.post('/addyuangong',function(req,res){
  var user = new User({
    name:req.body.name,
    userName:req.body.userName,
    password:req.body.password,
    isManager:req.body.isManager
  })
  user.save(function(err){
    if(err){
      return err;
    }else{
      res.json({msg:"success save"})
    }
  })
})
//获取所有员工信息
app.get('/getall',function(req,res){
  User.find(function(err,users){
    res.json({users:users})
  })
})
//修改员工信息  先请求得到要求改的员工信息
app.post('/getyuangong',function(req,res){

  User.findOne({userName:req.body.userName},function(err,doc){
    res.json(doc)
  })
})

app.put('/edityuangong',function(req,res){
  //查找 然后修改 保存
  User.findById({_id: req.body._id},function(err, doc){
    for (prop in req.body) {
      doc[prop] = req.body[prop];
    }
    doc.save(function(err){
      if (err) return res.status(500).json({error: err.message});
      res.json({msg: '修改成功啦！'});
    })

  })
})

//删除员工信息
app.post('/delyuangong',function(req,res){
  User.findOne({userName:req.body.userName},function(err,doc){
    doc.remove(function(err){
      res.send('deled')
    })
  })
})
//添加汽车信息
app.post('/addcar',function(req,res){
  var car = new Cars(req.body);
  car.save(function(err){
    try{
      res.json({msg:"save success"})
    }catch(err){
      res.json({err:"保存失败"})
    }
  })
})
//获取指定条数汽车信息
app.post('/getallcars',function(req,res){
  const pageNum = req.body.pageNum;
  const pageSize = req.body.pageSize;
  var count = 0;
  Cars.count({},function(err,tiaoshu){
    try{
      count=tiaoshu;
    }catch(err){
      console.log(err);
    }
  });

  Cars.find({}).skip(pageNum*pageSize-pageSize).limit(pageSize).exec(function(err,doc){
    //console.log(doc);
    try{
      res.json({cars:doc,tiaoshu:count})
    }catch(err){
      res.json({error:"查找失败"})
    }
  })

})
//删除汽车
app.delete('/delcar/:_id',function (req, res) {
  var _id = req.params._id;
  Cars.findByIdAndRemove(_id,function (err) {
    if (err) {return console.log(err)};
    res.json({msg:'success'})
  })
});

//修改汽车
  //拿到需要修改的汽车信息
app.get('/getOneCar/:_id',function(req,res){
  var _id =req.params._id;
  Cars.findById(_id,function(err,doc){
    if (err) {return console.log(err)};
    res.json(doc);
  })
})
//修改汽车
app.put('/editcar/:_id',function(req,res){
  var _id =req.params._id;
  console.log(_id);
  console.log(req.body);
  Cars.findByIdAndUpdate(_id,req.body,function(err,doc){
    if (err) {return console.log(err)};
    res.json({msg: '修改成功啦！'});
  })

})



//服务器监听3000端口
app.listen(3000, function() {
  console.log('running on port 3000')
})
