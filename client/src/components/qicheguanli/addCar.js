import React, { PropTypes } from 'react';
import { Modal, Button ,Input,Tooltip } from 'antd';
import axios from 'axios';
import SiteConfig from '../../config';

const addCar = React.createClass({
  getInitialState() {
    return {
      ModalText: 'Content of the modal dialog',
      visible: false
    };
  },
  showModal() {
    this.setState({
      visible: true,
    });
  },
  handleOk() {
    let pics=[];
    pics[0]=this.refs.carPic1.refs.input.value;
    pics[1]=this.refs.carPic2.refs.input.value;
    pics[2]=this.refs.carPic3.refs.input.value;
    let newCar={
      name:this.refs.name.refs.input.value,
      userName:this.refs.username.refs.input.value,
      carName:this.refs.carName.refs.input.value,
      carPrice:this.refs.carPrice.refs.input.value,
      carStock:this.refs.carStock.refs.input.value,
      carPics:pics,
      carDescription:this.refs.carDescription.value
    }
  //  console.log(newCar);
    axios.post(`${SiteConfig.host}/addcar`,newCar)
         .then((res)=>{
           if(res.data.msg){
            setTimeout(() => {
              this.setState({
                visible: false,
                confirmLoading: false,
              });
            }, 600);
            this.props.loadnew();
           }
         })

    this.setState({
      confirmLoading: true
    });
    this.refs.name.refs.input.value='';
    this.refs.username.refs.input.value='';
    this.refs.carName.refs.input.value='';
    this.refs.carPrice.refs.input.value='';
    this.refs.carStock.refs.input.value='';
    this.refs.carPic1.refs.input.value='';
    this.refs.carPic2.refs.input.value='';
    this.refs.carPic3.refs.input.value='';
    this.refs.carDescription.value='';

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
    const styles={
      p:{
        margin:"15px auto",
        width:"60%"
      },
      textarea:{
        width:"100%",
        borderRadius:"4px",
        resize:"none",
        height:"130px",
        padding:"4px 10px",
        outline:"none"
      }
    }
    return (
      <div style={{margin:"10px"}}>
        <Button type="primary" onClick={this.showModal}>添加汽车信息</Button>

        <Modal title="添加汽车信息"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText='保存'
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='姓名'><Input addonBefore="姓  名:" ref="name"/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='用户名'><Input addonBefore="用户名:" ref='username'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='汽车名'><Input addonBefore="汽车名:" ref='carName'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='价格'><Input addonBefore="价  格:" ref='carPrice'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='请输入图片网址'><Input addonBefore="图片1:" ref='carPic1'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='请输入图片网址'><Input addonBefore="图片2:" ref='carPic2'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='请输入图片网址'><Input addonBefore="图片3:" ref='carPic3'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='库存'><Input addonBefore="库存:" ref='carStock'/></Tooltip></p>
          <p style={styles.p}><textarea style={styles.textarea}  ref='carDescription'>
          </textarea></p>

        </Modal>
      </div>
    );
  },
});
export default addCar;
