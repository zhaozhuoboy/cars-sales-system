import React, { PropTypes } from 'react';
import { Modal, Button ,Input,Radio} from 'antd';
import axios from 'axios';
import SiteConfig from '../config';

const RadioGroup = Radio.Group;

const AddYuanGong = React.createClass({
  getInitialState() {
    return {
      ModalText: 'Content of the modal dialog',
      visible: false,
      value:'y'//是否管理员值
    };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    let newUser={
      name:this.refs.name.refs.input.value,
      username:this.refs.username.refs.input.value,
      password:this.refs.password.refs.input.value,
      isManager:this.state.value
    }
    console.log(newUser);
    axios.post(`${SiteConfig.host}/addyuangong`,newUser)
         .then((res)=>{
           console.log(res.data);
           if(res.data.msg){
             this.setState({
               visible: false,
               confirmLoading: false,
             })
           }
         })
    this.setState({
      confirmLoading: true
    });
    this.refs.name.refs.input.value='';
    this.refs.username.refs.input.value='';
    this.refs.password.refs.input.value='';
  },
  handleCancel() {//点击取消按钮
    this.setState({
      visible: false,
    });
  },
  onChange(e) {
    this.setState({
      value: e.target.value,
    });
  },
  render() {
    return (
      <div style={{margin:"10px"}}>
        <Button type="primary" onClick={this.showModal}>添加员工</Button>
        <Button style={{marginLeft:"20px"}}>刷新</Button>
        <Modal title="添加新员工"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText='保存'
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p style={{margin:"15px auto",width:"60%"}}><Input addonBefore="姓  名:" ref="name"/></p>
          <p style={{margin:"15px auto",width:"60%"}}><Input addonBefore="用户名:" ref='username'/></p>
          <p style={{margin:"15px auto",width:"60%"}}><Input addonBefore="密  码:" ref='password'/></p>
          <p style={{margin:"15px auto",width:"60%"}}>
            <span style={{fontSize:"14px",display:"inline-block"}}>是否管理员：</span>
            <RadioGroup onChange={this.onChange} value={this.state.value} size='large'>
              <Radio value='y'>是</Radio>
              <Radio value='n'>否</Radio>
            </RadioGroup>
          </p>
        </Modal>
      </div>
    );
  },
});
export default AddYuanGong;
