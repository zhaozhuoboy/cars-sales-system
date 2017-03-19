import React, { PropTypes } from 'react'
import EditNewsForm from './EditNewsForm'
import axios from 'axios'
import SiteConfig from '../../config'
import isEmpty from 'lodash/fp/isEmpty';
class EditNews extends React.Component {
  constructor(){
    super()
    this.state={
      data:{}
    }
  }
  componentWillMount(){
    const editNew_id = sessionStorage.getItem('editNew_id');
    if(editNew_id !=''){
      axios.get(`${SiteConfig.host}/getOneNew/${editNew_id}`)
           .then( (res)=>{
             console.log(res.data);
             this.setState({
               data:res.data
             })
           })
    }
  }
  render () {
    return(
      <div>
        {!isEmpty(this.state.data) ?
            <EditNewsForm post={this.state.data}/>:''
        }
      </div>
    )
  }
}

export default EditNews;
