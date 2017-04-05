import React, { PropTypes } from 'react';
import axios from 'axios';
import SiteConfig from '../config';
import { Link ,browserHistory} from 'react-router';
import { Modal, Button,Input,Tooltip,message  } from 'antd';
const confirm = Modal.confirm;
class UserInfo extends React.Component {
  constructor(){
    super();
    this.state={
      userName:'',
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
    var newPassword =  this.refs.newPassword.refs.input.value;
    var repeatPassword = this.refs.repeatPassword.refs.input.value;
    var user_id = sessionStorage.getItem('user_id');
    if(newPassword != repeatPassword){
      message.error('两次密码不一致');
    }else{
      this.setState({
        confirmLoading: true
      });
      axios.put(`${SiteConfig.host}/staffinfo/${user_id}`,{
        password:newPassword
      }).then((res)=>{
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
          this.refs.newPassword.refs.input.value = '';
          this.refs.repeatPassword.refs.input.value = '';
        }, 1000);
        setTimeout(()=>{
          confirm({
            title: '提醒',
            content: '您修改了密码，需要重新登录',
            onOk() {
              browserHistory.push('/');
            },
            onCancel() {
              alert('修改密码后必须重新登录');
              browserHistory.push('/');
            }
          });
        },2000)
      })
    }
  }

  handleCancel(){
    this.refs.newPassword.refs.input.value = '';
    this.refs.repeatPassword.refs.input.value = '';
    this.setState({
      visible: false,
    });
  }
  render () {
    const styles ={
      label:{
        display:"inline-block",
        margin:"10px",
        fontSize:"20px"
      }
    }
    return(
      <div>
        <p style={styles.label}>用户名 {this.state.userName}</p>
        <p style={styles.label}>姓  名 {this.state.name}</p>
        <Link onClick={this.showModal.bind(this)}>修改密码</Link>
        <Modal id="modal" title="修改密码"
          visible={this.state.visible}
          onOk={this.handleOk.bind(this)}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel.bind(this)}
        >
          <Input.Group>
            <p style={{width:"80%",margin:"10px auto"}}>
              <Tooltip title="新密码" placement="left">
                <Input type="password" addonBefore="新密码" ref="newPassword" />
              </Tooltip>
            </p>
            <p style={{width:"80%",margin:"10px auto"}}>
              <Tooltip title="确认密码" placement="left">
                <Input type="password" addonBefore="确认密码" ref="repeatPassword"/>
              </Tooltip>
            </p>
          </Input.Group>
        </Modal>
      </div>
    )
  }
}

export default UserInfo;
