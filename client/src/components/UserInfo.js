import React, { PropTypes } from 'react';
import axios from 'axios';
import SiteConfig from '../config';
import { Link } from 'react-router';
import { Modal, Button,Input } from 'antd';
class UserInfo extends React.Component {
  constructor(){
    super();
    this.state={
      userName:'',
      password:'',
      name:'',
      visible: false
    }
  }
  componentWillMount(){
    let user_id = sessionStorage.getItem('user_id');
    axios.get(`${SiteConfig.host}/getuserinfo/${user_id}`)
         .then( (res)=>{
           this.setState({
             userName:res.data.info.userName,
             password:res.data.info.password,
             name:res.data.info.name
           })
         })
  }
  showModal(){
    this.setState({
      visible: true,
    });
  }
  handleOk(){
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  }
  handleCancel(){
    this.setState({
      visible: false,
    });
  }
  render () {
    return(
      <div>
        <label>用户名{this.state.userName}</label>
        <label>姓  名{this.state.name}</label>
        <Link onClick={this.showModal.bind(this)}>修改密码</Link>
        <Modal title="修改密码"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel.bind(this)}
        >
          <Input.Group>
            <p style={{width:"80%",margin:"10px auto"}}><Input type="password" addonBefore="新密码"/></p>
            <p style={{width:"80%",margin:"10px auto"}}><Input type="password" addonBefore="确认密码"/></p>
          </Input.Group>
        </Modal>
      </div>
    )
  }
}

export default UserInfo;
