import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
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
            <Menu.Item key="1"><Link to='/all-yuangong'>查看所有员工</Link></Menu.Item>
            <Menu.Item key="2"><Link to='/edit-yuangong'>修改员工信息</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>汽车信息管理</span></span>}>
          <Menu.Item key="3"><Link to='all-cars'>查看所有汽车</Link></Menu.Item>
          <Menu.Item key="4"><Link to='add-cars'>添加新款汽车</Link></Menu.Item>
          <Menu.Item key="5"><Link to='edit-cars'>修改汽车信息</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="setting" /><span>新闻/图片发布</span></span>}>
          <Menu.Item key="6"><Link to='news-publish'>新闻发布</Link></Menu.Item>
          <Menu.Item key="7"><Link to='pic-publish'>图片发布</Link></Menu.Item>

        </SubMenu>
      </Menu>
      </QueueAnim>

    );
  },
});
export default LeftNav;
