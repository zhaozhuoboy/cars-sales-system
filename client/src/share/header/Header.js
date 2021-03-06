import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import QueueAnim from 'rc-queue-anim';
import './header.css'
class Header extends React.Component {
  constructor(){
   super()
   this.state={
     user:''
   }
 }
  componentWillMount(){
    if(sessionStorage.getItem('user')){
      this.setState({
        user:sessionStorage.getItem('user')
      })
    }
  }

  render () {
    return(
      <QueueAnim duration={1000} type='top' interval={0}>
      <div className='header clearfix' key='0'>
        <div className='logo'>
          汽车销售后台管理系统
        </div>
        <div className='user'>
          <p className='user-name'>{this.state.user}</p>
          <Link to='/'> 退出登陆 </Link>
        </div>
      </div>
      </QueueAnim>
    )
  }
}

export default Header;
