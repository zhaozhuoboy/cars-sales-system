import React, { PropTypes } from 'react';
import EditYuanGongForm from './editYuanGongForm';
import axios from 'axios';
import SiteConfig from '../config';
import isEmpty from 'lodash/fp/isEmpty';
import {  notification } from 'antd';

class EditYuanGong extends React.Component {
  constructor(){
    super();
    this.state={
      data:{}
    }
  }
  componentWillMount(){
    const editYuanGongName = sessionStorage.getItem('editYuanGong');
    console.log(editYuanGongName);
    if(editYuanGongName !=''){
      axios.post(`${SiteConfig.host}/getyuangong`,{userName:editYuanGongName})
           .then((res)=>{
             this.setState({
               data:res.data
             })
           })
    }
  }
  publishPost(data){
    axios.put(`${SiteConfig.host}/edityuangong`,data)
         .then((res)=>{
           const args = {
             message: "提示：",
             description:res.data.msg,
             duration:3
           };
           notification.success(args);
         })
  }
  render () {
    return(
      <div>
        {!isEmpty(this.state.data) ?
          <EditYuanGongForm post={this.state.data} publishPost={this.publishPost.bind(this)}/> : ""
        }
      </div>
    )
  }
}

export default EditYuanGong;
