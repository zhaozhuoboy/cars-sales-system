import React, { PropTypes } from 'react'
import QueueAnim from 'rc-queue-anim';
class Login extends React.Component {
  render () {
    return(
      <div style={{textAlign:'center'}}>
        <QueueAnim duration={1000} type='bottom'>
          <h1 key="1">登录界面</h1>
        </QueueAnim>
      </div>
    )
  }
}

export default Login;
