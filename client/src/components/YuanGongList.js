import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button ,notification} from 'antd';
import axios from 'axios';



class YuanGongList extends React.Component {
  del(){
    let isDelete = confirm('是否删除？')
    if(isDelete){
      this.props.del(this.props.username)
    }else{
      return;
    }

  }
  edit(e){
    // e.preventDefault();
    if(this.props.username == 'admin'){
      e.preventDefault();
      const args = {
        message: "提示：",
        description:'超级管理员用户信息不能修改！',
        duration:3
      };
      notification.warn(args);
    }else{
      sessionStorage.setItem('editYuanGong',this.props.username)
    }

  }
  render () {
    let styles={
      root:{padding:"5px 0",marginBottom:"2px",borderBottom:"1px solid #eee"},
      span:{fontSize:"14px"}
    }
    return(
      <li style={styles.root}>

        <span style={styles.span} className='username'>{this.props.username}</span>
        <span style={styles.span} className='name'>{this.props.name}</span>
        <span style={styles.span} className='ismanager'>{this.props.ismanager}</span>
        <span style={styles.span} className='caozuo'><Link to='/edit-yuangong' onClick={this.edit.bind(this)}>修改</Link>
        <Button style={{marginLeft:"10px"}} onClick={this.del.bind(this)}>删除</Button></span>
      </li>
    )
  }
}

export default YuanGongList;
