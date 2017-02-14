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
//连接数据库
var db = mongoose.connection;
db.on('error', console.log);
db.once('open', function() {
  console.log('数据库连接成功！!')
});





//导入路由规则
var routes = require('./routes');
routes(app);

//服务器监听3000端口
app.listen(3000, function() {
  console.log('running on port 3000')
})
