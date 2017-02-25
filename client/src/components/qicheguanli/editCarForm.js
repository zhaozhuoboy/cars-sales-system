import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Radium from 'radium';
import SiteConfig from '../config';
import isEmpty from 'lodash/fp/isEmpty';

class EditYuanGongForm extends React.Component {

  getStyles() {
    return {
      form: {
        margin:"0 auto",
        padding: '20px 40px',
        width:"80%",
        textAlign:"right"
      },
      div: {
        marginBottom: '10px',
        width:'500px'
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
      }
    };
  }
  handleSubmit(e){
    e.preventDefault();
    // const userName = this.refs.userName.value;
    // const name = this.refs.name.value;
    // const password = this.refs.password.value;
    // const isManager = this.refs.isManager.value;
    const newxinxi ={
      _id:this.props.post._id,
      userName:this.refs.userName.value,
      name:this.refs.name.value,
      password:this.refs.password.value,
      isManager:this.refs.isManager.value
    }
    console.log(newxinxi);
     this.props.publishPost(newxinxi);

  }

  render () {

    const styles = this.getStyles();
    return(
      <div>
        <form style={styles.form} onSubmit={this.handleSubmit.bind(this)}>
        <div style={styles.div}>
          <label style={styles.label}>用户名</label>
          <input style={styles.input} ref='userName' defaultValue={this.props.post ? this.props.post.userName : ''}/>
        </div>
        <div style={styles.div}>
          <label style={styles.label}>姓&nbsp;&nbsp;&nbsp; 名</label>
          <input style={styles.input} ref='name' defaultValue={this.props.post ? this.props.post.name : ''}/>
        </div>
        <div style={styles.div}>
          <label style={styles.label}>密&nbsp;&nbsp;&nbsp; 码</label>
          <input style={styles.input} rows='20' key='1' ref='password' defaultValue={this.props.post ? this.props.post.password : ''}/>
        </div>
        <div style={styles.div}>
          <label style={styles.label}>是否管理员</label>
          <input style={styles.input} rows='20' key='1' ref='isManager' defaultValue={this.props.post ? this.props.post.isManager : ''}/>
        </div>
        <div style={styles.actions}>
          <button type='submit' style={styles.button} key='2'>更新</button>
          <Link to='/all-cars' style={styles.link}>返回查看</Link>
        </div>
      </form>
      </div>
    )
  }
}

export default Radium(EditYuanGongForm);
