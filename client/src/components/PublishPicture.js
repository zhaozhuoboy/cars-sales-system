import React, { PropTypes } from 'react';
import { Input, Icon ,Button,message,Alert   } from 'antd';
import axios from 'axios';
import SiteConfig from '../config.js';
class PublishPicture extends React.Component {
  constructor(){
    super();
    this.state={
      url:""
    }
  }
  emitEmpty(){
    this.urlInput.focus();
    this.urlInput.refs.input.value='';
    this.setState({ url:""});
  }
  onChangeUserName(e){
    this.setState({ url: e.target.value });
  }
  onSubmit(){
    if(this.state.url === ''){
      message.warning('请输入完整图片地址');
    }else{
      axios.post(`${SiteConfig.host}/addpic`,{url:this.state.url})
           .then((res)=>{
             message.success(res.data.msg);
           })
    }
  }
  render () {
    const suffix = this.state.url ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)} /> : null;
    return(
      <div>
        <div className="uploadImg">
          <Input
             placeholder="输入图片地址"
             prefix={<Icon type="link" />}
             suffix={suffix}
             onChange={this.onChangeUserName.bind(this)}
             ref={node => this.urlInput = node}
           />
         <Button style={{marginLeft:"10px"}} type="primary" onClick={this.onSubmit.bind(this)}>保存</Button>
        </div>
        <div className="pic-list">
           图片列表
        </div>
      </div>
    )
  }
}

export default PublishPicture;
