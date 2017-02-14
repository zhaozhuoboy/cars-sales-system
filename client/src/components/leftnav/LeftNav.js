import React from 'react';
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import QueueAnim from 'rc-queue-anim';
const LeftNav = React.createClass({
  getInitialState() {
    return {
      current: '1',
    };
  },
  handleClick(e) {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  },
  render() {
    return (
      <QueueAnim duration={1000} type='left' interval={0}>
      <Menu onClick={this.handleClick}
        style={{height:"100vh"}}
        defaultOpenKeys={['sub1','sub2','sub3']}
        selectedKeys={[this.state.current]}
        mode="inline"
        key='1'
      >
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>员工信息管理</span></span>}>
            <Menu.Item key="1">查看所有员工</Menu.Item>
            <Menu.Item key="2">添加员工信息</Menu.Item>
            <Menu.Item key="3">修改员工信息</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>汽车信息管理</span></span>}>
          <Menu.Item key="4">查看所有汽车</Menu.Item>
          <Menu.Item key="5">添加新款汽车</Menu.Item>
          <Menu.Item key="6">修改汽车信息</Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="setting" /><span>新闻/图片发布</span></span>}>
          <Menu.Item key="7">新闻发布</Menu.Item>
          <Menu.Item key="8">图片发布</Menu.Item>

        </SubMenu>
      </Menu>
      </QueueAnim>

    );
  },
});
export default LeftNav;
