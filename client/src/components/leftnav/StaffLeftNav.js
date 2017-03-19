import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
import QueueAnim from 'rc-queue-anim';
const StaffLeftNav = React.createClass({
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
  setNavBarState(){
    this.setState({
      current:this.context.router.isActive('/staff/info',true) ? "1":
              this.context.router.isActive('/staff/all-cars') ? "2":
              this.context.router.isActive('/staff/news-publish') ? "3":
              this.context.router.isActive('/staff/pic-publish') ? "4":''
    })
  },
  componentWillMount(){
    this.setNavBarState();
  },
  componentWillReceiveProps(nextProps){
    this.setNavBarState();
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
        <SubMenu key="sub1" title={<span><Icon type="mail" /><span>个人信息</span></span>}>
            <Menu.Item key="1"><Link to='/staff/info'>查看个人信息</Link></Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>汽车信息管理</span></span>}>
          <Menu.Item key="2"><Link to='/staff/all-cars'>查看所有汽车</Link></Menu.Item>

        </SubMenu>
        <SubMenu key="sub3" title={<span><Icon type="setting" /><span>新闻/图片发布</span></span>}>
          <Menu.Item key="3"><Link to='/staff/news-publish'>新闻发布</Link></Menu.Item>
          <Menu.Item key="4"><Link to='/staff/pic-publish'>图片发布</Link></Menu.Item>

        </SubMenu>
      </Menu>
      </QueueAnim>

    );
  },
});
StaffLeftNav.contextTypes={
  router:React.PropTypes.object.isRequired,
}
export default StaffLeftNav;
