import React from 'react'
import { Form, Icon, Input, Button, Checkbox ,notification} from 'antd';
import { Link } from 'react-router';
import './index.css';
import QueueAnim from 'rc-queue-anim';
import { browserHistory } from 'react-router';
import axios from 'axios';
import SiteConfig from '../../config';

const FormItem = Form.Item;
const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //把values  post传到后台，后台从数据库检索 对应正确之后返回信息  登录成功
        if(values.userName != undefined && values.password != undefined){
          axios.post(`${SiteConfig.host}/login`,values)
               .then( (res)=>{
                 console.log(res.data.info);
                  if(res.data.msg){
                    sessionStorage.setItem('user',res.data.info.userName);
                    sessionStorage.setItem('name',res.data.info.name);
                    sessionStorage.setItem('isManager',res.data.info.isManager);
                    sessionStorage.setItem('user_id',res.data.info._id);
                    if(res.data.isManager == 'y'){
                      browserHistory.push('/all-yuangong');
                      const args = {
                        message: '登录成功',
                        description:`欢迎您,${values.userName}`,
                        duration:3
                      };
                      notification.success(args);
                    }else{
                      browserHistory.push('/user/staff');
                      const args = {
                        message: '登录成功',
                        description:`欢迎您,${values.userName}`,
                        duration:3
                      };
                      notification.success(args);
                    }
                  }else{
                    const args = {
                      message: '提示：',
                      description: res.data.error,
                      duration:3
                    };
                    notification.warning(args);
                  }
               } )
        }else{
          const args = {
            message: '提示：',
            description: '用户名或密码不能为空！',
            duration:1.8
          };
          notification.warning(args);
        }


    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{paddingTop:"140px"}}>
      <Form onSubmit={this.handleSubmit} className="login-form">
        <QueueAnim duration={1000} type='bottom' interval={0}>
        <h1 key='0' style={{margin:"20px auto",textAlign:"center"}}>后台管理系统</h1>
        <FormItem key="1">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input addonBefore={<Icon type="user" />} placeholder="用户名" />
          )}
        </FormItem>
        <FormItem key="2">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input addonBefore={<Icon type="lock" />} type="password" placeholder="密 码" />
          )}
        </FormItem>
        <FormItem key="3">
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox style={{float:"right",marginBottom:"6px"}}>记住密码</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
        </FormItem>
        </QueueAnim>
      </Form>
      </div>
    );
  },
}));

export default NormalLoginForm;
