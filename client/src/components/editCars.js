import React, { PropTypes } from 'react';
import EditCarForm from './qicheguanli/EditCarForm';
import axios from 'axios';
import SiteConfig from '../config';
import isEmpty from 'lodash/fp/isEmpty';
import {  notification } from 'antd';

class EditCars extends React.Component {
  constructor(){
    super();
    this.state={
      data:{}
    }
  }
  componentWillMount(){
    const editCar_id = sessionStorage.getItem('editCar_id');
    if(editCar_id !=''){
      axios.get(`${SiteConfig.host}/getOneCar/${editCar_id}`)
           .then( (res)=>{
             console.log(res.data);
             this.setState({
               data:res.data
             })
           })
    }
  }
  publishPost(data){
    axios.put(`${SiteConfig.host}/editcar/${data._id}`,data)
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
          <EditCarForm post={this.state.data}
                      publishPost={this.publishPost.bind(this)}/>:''
        }
      </div>
    )
  }
}

export default EditCars;
