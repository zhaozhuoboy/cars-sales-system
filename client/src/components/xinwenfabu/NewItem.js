import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { Button } from 'antd';
import axios from 'axios';

class NewItem extends React.Component {

  del(){
    //console.log(this.props.id);
    let isDelete = confirm('是否删除？')
    if(isDelete){
      this.props.del(this.props.id)
    }else{
      return;
    }

  }
  edit(e){
    sessionStorage.setItem('editNew_id',this.props.id);
  }
  render () {
    const str = this.props.createTime;
    let date = str.substring(0,10);
    let time = str.substring(11,19);
    return(
      <tr style={{fontSize:"16px",textAlign:"center",lineHeight:"1.5em"}}>
        <td style={{textAlign:"left",padding: '8px',}}>{this.props.title}</td>
        <td>{this.props.author}</td>
        <td>{date+' '+time}</td>
        <td><Link to='/edit-news' onClick={this.edit.bind(this)}>修改</Link><Button style={{marginLeft:"20px"}} size="small" onClick={this.del.bind(this)}>删除</Button></td>
      </tr>
    )
  }
}

export default NewItem;
