var express = require('express');
module.exports = function(app){
  app.get('/',function(req,res){
    res.send('hello')
  })
  //前台提交过来的用户名和密码 从数据库中找到，如果匹配成功则返回成功数据，前端跳转路由
  //表结构是   userName  password  isManager
  //提交过来的数据 从数据库查找，如果找到 判断密码是不是一致 ，如果一致 再判断isManager
  //根据 isManager 重定向到 管理员页面还是  职员页面
  app.post('/login',function(req,res){
    //User.findOne({userName:req.body.userName});
    //req.body.userName=='admin' && req.body.password =='admin'
    if(req.body.userName=='zhaozhuo' && req.body.password =='zhaozhuo'){
      res.json({msg:'success'})
    }else{
      res.json({error:'用户名或密码错误！'})
    }
  })
}
