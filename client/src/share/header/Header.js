import React, { PropTypes } from 'react'
import './header.css'
class Header extends React.Component {
  render () {
    return(
      <div className='header'>
        <div className='logo'>
          汽车销售后台管理系统
        </div>
        <div className='user'>
          <p className='user-name'>admin</p>
        </div>
      </div>
    )
  }
}

export default Header;
