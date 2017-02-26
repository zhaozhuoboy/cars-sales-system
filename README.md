## 【基于Node.js的汽车销售后台管理系统】
---
- client 为前端页面代码
- server 为后端代码

### 项目启动
---
进入 client
```
cd client
yarn install  //安装项目开发依赖包
npm start

```
浏览器中输入  localhost:8080

前端配置文件  config中存放的是  后台接口的 地址
当后台服务器地址发生变化时  只需要更改 config文件中的  host 对应的值

---
### 后端项目启动

进入server目录之后，先安装项目依赖包
```
npm install

```

全局安装 nodemon 用于启动后台服务 修改代码后不用重新 运行index.js
```
npm install -g nodemon

```
新建数据库存放目录
```
cd server && mkdir data
cd data && mkdir db

```

返回 server目录 启动mongodb数据库服务
```
mongod --dbpath=./data/db

```
启动后台主文件
```
nodemon index.js

```
