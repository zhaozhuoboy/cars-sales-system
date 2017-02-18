import React, { PropTypes } from 'react';
import { Button} from 'antd';
import { Link } from 'react-router';
import AddYuanGong from './addYuanGong';
import YuanGongList from './YuanGongList';
import axios from 'axios';
import SiteConfig from '../config';
import '../css/allYuanGong.css';
import {  notification } from 'antd';

class AllYuanGong extends React.Component {
  constructor(){
    super()
    this.state={
      allData:[],
      loadData:true
    }
  }
  componentWillMount(){
    axios.get(`${SiteConfig.host}/getall`)
         .then((res)=>{
           this.setState({
             allData:res.data.users,
             loadData:false
           });
         })
  }
  del(username){
    //把username 传到后台 然后查找，找到之后删除
    if(username == 'admin') {
      const args = {
        message: '警告：',
        description:"超级管理员账号不能删除!",
        duration:2
      };
      notification.warning(args);
      return;
    }
    axios.post(`${SiteConfig.host}/delyuangong`,{userName:username})
         .then((res)=>{
           console.log(res);
           if(res.status ==200){
             const args = {
               message: '提示：',
               description:"删除成功!",
               duration:2
             };
             notification.info(args);
           }
           this.componentWillMount();
         })
  }
  render () {
    const allyuangong = this.state.allData.map( (item , i) => <YuanGongList
    key={item._id}
    name={item.name}
    username={item.userName}
    ismanager={item.isManager}
    del={this.del.bind(this)}
    /> );
    return(
      <div>
        <AddYuanGong loadnew={this.componentWillMount.bind(this)}/>
        <ul className="all-header clearfix" style={{overflowY:"auto"}}>
          <li style={{borderBottom: '2px solid #eee',marginBottom:'10px'}}><span className='username'>用户名</span><span className='name'>姓名</span><span className='ismanager'>是否管理员</span><span className='caozuo'>操作</span></li>
        </ul>
        <ul className="all-header clearfix">
          {this.state.loadData ? '暂无数据':allyuangong}
        </ul>

      </div>
    )
  }
}

export default AllYuanGong;
