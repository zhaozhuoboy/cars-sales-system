import React, { PropTypes } from 'react';
import { Link,browserHistory } from 'react-router';
import Radium from 'radium';
import SiteConfig from '../../config';
import isEmpty from 'lodash/fp/isEmpty';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw ,EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

class EditYuanGongForm extends React.Component {
  constructor(){
    super()
    this.state={
      editorState:[]
    }
  }
  onEditorStateChange (index, editorContent) {
    let editorState = this.state.editorState;
    editorState[index] = editorContent;
    editorState = [...editorState];
    this.setState({
      editorState,
    });
  }
  componentWillMount(){
    const blocksFromHTML = htmlToDraft(this.props.post.carDescription);
    const contentBlocks = blocksFromHTML.contentBlocks;
    const contentState = ContentState.createFromBlockArray(contentBlocks);
    const editorState = EditorState.createWithContent(contentState);
    let state = this.state.editorState;
    state[0] = editorState;
    state = [...state];
    this.setState({
      state,
    })
  }

  getStyles() {
    return {
      form: {
        margin:"0 auto",
        padding: '0px 10px',
        width:"96%",
        textAlign:"right"
      },
      div: {
        marginBottom: '4px',

      },
      label: {
        display: 'inline-block',
        fontSize: '1.3em',
        color: 'rgba(0,0,0,.6)',
        paddingBottom: '10px',
        textAlign:"right",
        marginRight:"20px"
      },
      select: {
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1em',
        height: '30px',
        backgroundColor: '#fff',
        ':focus': {
          outline: 'none'
        }
      },
      input: {
        width: '300px',
        height: '35px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        fontSize: '1em',
        padding: '10px',
        boxSizing: 'border-box',
        ':focus': {
          border: '1px solid #00bcd4',
          outline: 'none'
        }
      },
      actions: {
        textAlign: 'center',
        clear:"both"
      },
      button: {
        width: '120px',
        height: '36px',
        border: 'none',
        backgroundColor: '#ff4081',
        fontSize: '1em',
        color: '#fff',
        display: 'inline-block',
        margin: '20px auto 0',
        borderRadius: '20px',
        ':hover': {
          cursor: 'pointer'
        },
        ':focus': {
          outline: 'none'
        }
      },
      link: {
        display: 'inline-block',
        marginLeft: '15px',
        fontSize: '1em',
        color: '#00bcd4',
        opacity: '.8',
        textDecoration: 'none',
        backgroundColor:"#fff",
        border:"none",
        outline:"none",
        cursor:"pointer"
      },
      textarea:{
        width:"300px",
        borderRadius:"4px",
        resize:"none",
        border: '1px solid #ddd',
        height:"130px",
        padding:"4px 10px",
        outline:"none",
        ':focus': {
          border: '1px solid #00bcd4',
          outline: 'none'
        }
      },
      editorStyle:{
        border:'1px solid #F1F1F1',
        boxSizing: 'border-box',
        height:'220px',
        padding:'10px',
        fontSize:'14px'
      }
    };
  }
  handleSubmit(e){
    e.preventDefault();
    let editorContent = this.state.editorState[0];
    let contentHtml = draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    const newxinxi ={
      _id:this.props.post._id,
      name:this.refs.name.value,
      userName:this.refs.userName.value,
      carName:this.refs.carName.value,
      carPrice:this.refs.carPrice.value,
      carStock:this.refs.carStock.value,
      carPics:[this.refs.carPic1.value,this.refs.carPic2.value,this.refs.carPic3.value],
      carDescription:contentHtml
    }
    console.log(newxinxi);
     this.props.publishPost(newxinxi);

  }
 goBack(){
   let isManager = sessionStorage.getItem('isManager');
   if(isManager == 'y'){
     browserHistory.push('/all-cars');
   }else{
     browserHistory.push('/staff/all-cars');
   }
 }
  render () {

    const styles = this.getStyles();
    const isManager = sessionStorage.getItem('isManager');
    return(
      <div>
        <form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
        <div style={{float:"left",width:"40%",marginRight:"20px"}}>
          <div style={styles.div}>
            <label style={styles.label}>姓名</label>
            <input disabled style={styles.input} ref='name' defaultValue={this.props.post ? this.props.post.name : ''}/>
          </div>
          <div style={styles.div}>
            <label style={styles.label}>用户名</label>
            <input disabled style={styles.input} ref='userName' defaultValue={this.props.post ? this.props.post.userName : ''}/>
          </div>
          <div style={styles.div}>
            <label style={styles.label}>汽车名</label>
            <input style={styles.input} key='1' ref='carName' defaultValue={this.props.post ? this.props.post.carName : ''}/>
          </div>
          <div style={styles.div}>
            <label style={styles.label}>价格</label>
            <input style={styles.input} key='1' ref='carPrice' defaultValue={this.props.post ? this.props.post.carPrice : ''}/>
          </div>
          <div style={styles.div}>
            <label style={styles.label}>库存</label>
            <input style={styles.input} key='1' ref='carStock' defaultValue={this.props.post ? this.props.post.carStock : ''}/>
          </div>
          <div style={styles.div}>
            <label style={styles.label}>图片1</label>
            <input style={styles.input} key='1' ref='carPic1' defaultValue={this.props.post ? this.props.post.carPics[0] : ''}/>
          </div>
          <div style={styles.div}>
            <label style={styles.label}>图片2</label>
            <input style={styles.input} key='1' ref='carPic2' defaultValue={this.props.post ? this.props.post.carPics[1] : ''}/>
          </div>
          <div style={styles.div}>
            <label style={styles.label}>图片3</label>
            <input style={styles.input} key='1' ref='carPic3' defaultValue={this.props.post ? this.props.post.carPics[2] : ''}/>
          </div>
        </div>
        <div style={{float:"left",width:"57%"}}>
          <Editor
             wrapperClassName="wrapper-class"
             editorClassName="editor-class"
             toolbarClassName="toolbar-class"
             wrapperStyle={styles.wrapperStyle}
             editorStyle={styles.editorStyle}

             editorState={this.state.editorState[0]}
             onEditorStateChange={this.onEditorStateChange.bind(this,0)}
            />
        </div>
        <div style={styles.actions}>
          <button type='submit' style={styles.button} key='2'>更新</button>
          <Link onClick={this.goBack.bind(this)} style={styles.link}>返回查看</Link>
        </div>
      </form>
      </div>
    )
  }
}

export default Radium(EditYuanGongForm);
