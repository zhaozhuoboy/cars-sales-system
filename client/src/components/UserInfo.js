import React, { PropTypes } from 'react';
import axios from 'axios';
import SiteConfig from '../config';

class UserInfo extends React.Component {
  constructor(){
    super();
    this.state={
      userName:'test',
      password:'test',
      name:'测试'
    }
  }
  componentWillMount(){
    let user_id = sessionStorage.getItem('user_id');
    axios.get(`${SiteConfig}.host/getUserInfo/${user_id}`)
  }
  render () {
    return(
      <div>
        <h3><span>用户名</span>{this.state.userName}</h3>
        <h3><span>密 &nbsp; 码</span>{this.state.password}</h3>
      </div>
    )
  }
}

export default UserInfo;
