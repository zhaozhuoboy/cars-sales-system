import React, { PropTypes } from 'react';
import { Modal, Button ,Input,Tooltip } from 'antd';
import axios from 'axios';
import SiteConfig from '../../config';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';

const addCar = React.createClass({
  getInitialState() {
    return {
      ModalText: 'Content of the modal dialog',
      visible: false,
      editorState:[]
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
    let editorContent = this.state.editorState[0];
    let contentHtml = draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    let newCar={
      name:sessionStorage.getItem('name'),
      userName:sessionStorage.getItem('user'),
      carName:this.refs.carName.refs.input.value,
      carPrice:this.refs.carPrice.refs.input.value,
      carStock:this.refs.carStock.refs.input.value,
      carPics:pics,
      carDescription:contentHtml
    }
    console.log(newCar);
    axios.post(`${SiteConfig.host}/addcar`,newCar)
         .then((res)=>{
           if(res.data.msg){
            setTimeout(() => {
              this.setState({
                visible: false,
                confirmLoading: false,
                editorState:[]
              });
            }, 600);
            this.props.loadnew();
           }
         })

    this.setState({
      confirmLoading: true
    });

    this.refs.carName.refs.input.value='';
    this.refs.carPrice.refs.input.value='';
    this.refs.carStock.refs.input.value='';
    this.refs.carPic1.refs.input.value='';
    this.refs.carPic2.refs.input.value='';
    this.refs.carPic3.refs.input.value='';

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
  onEditorStateChange (index, editorContent) {
    let editorState = this.state.editorState;
    editorState[index] = editorContent;
    editorState = [...editorState];
    this.setState({
      editorState,
    });
  },
  render() {
    const styles={
      p:{
        float:'left',
        margin:"8px 10px",
        width:"48%"
      },
      textarea:{
        width:"100%",
        borderRadius:"4px",
        resize:"none",
        height:"130px",
        padding:"4px 10px",
        outline:"none"
      },editorStyle:{
        border:'1px solid #F1F1F1',
        boxSizing: 'border-box',
        height:"200px",
        padding:'10px',
        fontSize:'14px'
      }
    }
    //const { editorState } = this.state;
    return (
      <div style={{margin:"10px"}}>
        <Button type="primary" onClick={this.showModal}>添加汽车信息</Button>

        <Modal title="添加汽车信息"
          width="80%"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText='保存'
          confirmLoading={this.state.confirmLoading}
          onCancel={this.handleCancel}
        >
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='汽车名'><Input addonBefore="汽车名:" ref='carName'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='价格'><Input addonBefore="价  格:" ref='carPrice'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='请输入图片网址'><Input addonBefore="图片1:" ref='carPic1'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='请输入图片网址'><Input addonBefore="图片2:" ref='carPic2'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='请输入图片网址'><Input addonBefore="图片3:" ref='carPic3'/></Tooltip></p>
          <p style={styles.p}><Tooltip placement='right' trigger='focus' title='库存'><Input addonBefore="库存:" ref='carStock'/></Tooltip></p>

            {/*<textarea style={styles.textarea}  ref='carDescription'></textarea>*/}
              <Editor
                 wrapperClassName="wrapper-class"
                 editorClassName="editor-class"
                 toolbarClassName="toolbar-class"
                 wrapperStyle={styles.wrapperStyle}
                 editorStyle={styles.editorStyle}

                 editorState={this.state.editorState[0]}
                 onEditorStateChange={this.onEditorStateChange.bind(this,0)}
                />


        </Modal>
      </div>
    );
  },
});
export default addCar;
