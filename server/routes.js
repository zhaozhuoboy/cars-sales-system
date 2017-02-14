var express = require('express');
module.exports = function(app){
  //前台提交过来的用户名和密码 从数据库中找到，如果匹配成功则返回成功数据，前端跳转路由
  app.post('/login',function(req,res){
    User.findOne({userName:req.body.userName});
  })
}
