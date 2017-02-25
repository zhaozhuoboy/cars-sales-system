import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'antd';
import axios from 'axios';

class CarItem extends React.Component {

  del(){
    //console.log(this.props.id);
    let isDelete = confirm('是否删除？')
    if(isDelete){
      this.props.del(this.props.id)
    }else{
      return;
    }

  }
  render () {
    return(
      <tr style={{fontSize:"16px",textAlign:"center",lineHeight:"1.5em"}}>
        <td style={{width:"200px"}}>{this.props.carName}</td>
        <td style={{width:"100px"}}>{this.props.carStock}</td>
        <td style={{width:"200px"}}>{this.props.carPrice}</td>
        <td style={{width:"200px"}}>{this.props.name}</td>
        <td><Link to='/edit-cars'>修改</Link><Button style={{marginLeft:"20px"}} size="small" onClick={this.del.bind(this)}>删除</Button></td>
      </tr>
    )
  }
}

export default CarItem;
