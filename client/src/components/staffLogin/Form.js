import React from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
import './index.css';
import QueueAnim from 'rc-queue-anim';

const NormalLoginForm = Form.create()(React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  },
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <QueueAnim duration={1000} type='bottom' interval={0}>
        <h1 key='0' style={{margin:"20px auto",textAlign:"center"}}>员工登录</h1>
        <FormItem key="1">
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: '请输入您的用户名!' }],
          })(
            <Input placeholder="用户名" />
          )}
        </FormItem>
        <FormItem key="2">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入您的密码!' }],
          })(
            <Input type="password" placeholder="密 码" />
          )}
        </FormItem>
        <FormItem key="3">
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>记住密码</Checkbox>
          )}
          <Link className="login-form-forgot" to='/'>管理员登录入口</Link>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登 录
          </Button>
        </FormItem>
        </QueueAnim>
      </Form>
    );
  },
}));

export default NormalLoginForm;
