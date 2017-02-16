import React, { PropTypes } from 'react';
import { Modal, Button ,Input} from 'antd';

const AddYuanGong = React.createClass({
  getInitialState() {
    return {
      ModalText: 'Content of the modal dialog',
      visible: false,
    };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    let newData={
      name:this.refs.name.refs.input.value,
      username:this.refs.username.refs.input.value,
      password:this.refs.password.refs.input.value
    }
    console.log(newData);
    this.setState({
      confirmLoading: true
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
    this.refs.name.refs.input.value='';
    this.refs.username.refs.input.value='';
    this.refs.password.refs.input.value='';
  },
  handleCancel() {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  },
  render() {
    return (
      <div style={{margin:"10px"}}>
        <Button type="primary" onClick={this.showModal}>添加员工</Button>
        <Modal title="添加新员工"
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p style={{margin:"10px auto",width:"60%"}}><Input addonBefore="姓  名:" ref="name"/></p>
          <p style={{margin:"10px auto",width:"60%"}}><Input addonBefore="用户名:" ref='username'/></p>
          <p style={{margin:"10px auto",width:"60%"}}><Input addonBefore="密  码:" ref='password'/></p>
        </Modal>
      </div>
    );
  },
});
export default AddYuanGong;
