import React, { PropTypes } from 'react';
import Radium from 'radium';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import {  notification } from 'antd';
import axios from 'axios';
import SiteConfig from '../../config.js'
class NewsForm extends React.Component {
  constructor(){
    super()
    this.state={
      editorState:[]
    }
  }
  getStyles() {
    return {
      form: {
        margin:"0 auto",
        padding: '20px 40px',
        width:"90%",
      },
      div: {
        float:"left",
        margin: '0 10px 10px 0',
        display:'inline-block'
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
        height: '25px',
        border: 'none',
        fontSize: '1em',
        padding: '10px',
        boxSizing: 'border-box',
        outline:"none",
        border:"1px solid #f1f1f1",
        borderRadius:'5px',
        ':focus': {
          outline: 'none',
          border:"1px solid #ff4081",
        }
      },
      actions: {
        textAlign: 'center'
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
      editorStyle:{
        border:'1px solid #F1F1F1',
        boxSizing: 'border-box',
        height:'300px',
        padding:'10px',
        fontSize:'14px'
      }
    };
  }
  onEditorStateChange (index, editorContent) {
    let editorState = this.state.editorState;
    editorState[index] = editorContent;
    editorState = [...editorState];
    this.setState({
      editorState,
    });
  }
  handleSubmit(e){
    e.preventDefault();
    let editorContent = this.state.editorState[0];
    let contentHtml = draftToHtml(convertToRaw(editorContent.getCurrentContent()))
    let newsdata ={
      title:this.refs.title.value,
      author:this.refs.author.value,
      news_content:contentHtml
    }
    axios.post(`${SiteConfig.host}/addnews`,newsdata)
         .then((res)=>{
           const args = {
             message: "提示：",
             description:res.data.msg,
             duration:3
           };
           notification.success(args);
           this.refs.title.value = '';
           this.refs.author.value = '';
           this.setState({
             editorState:[]
           })
         })
  }
  render () {
    const styles = this.getStyles();
    const { editorState } = this.state;
    return(
      <div>
        <form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
          <div style={styles.div}>
            <label style={styles.label}>标题</label>
            <input style={styles.input} ref='title'/>
          </div>
          <div style={styles.div}>
            <label style={styles.label}>作者</label>
            <input style={styles.input} ref='author' />
          </div>

          <Editor
             wrapperClassName="wrapper-class"
             editorClassName="editor-class"
             toolbarClassName="toolbar-class"
             wrapperStyle={styles.wrapperStyle}
             editorStyle={styles.editorStyle}

             editorState={editorState[0]}
             onEditorStateChange={this.onEditorStateChange.bind(this,0)}
            />
            <div style={styles.actions}>
              <button type='submit' style={styles.button} key='2'>保存</button>
            </div>
        </form>
      </div>
    )
  }
}

export default Radium(NewsForm);
