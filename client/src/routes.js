import React, { PropTypes } from 'react';
import { Router , Route,browserHistory,IndexRoute} from 'react-router'

import App from './App';//admin 管理界面
import Staff from './Staff';//staff 职员后台界面
import AdminLogin from './components/login/NormalLoginForm';
import StaffLogin from './components/staffLogin/index';
class Rrouters extends React.Component {
  render () {
    return(
      <Router history={browserHistory}>
        <Route path='/' components={AdminLogin} />
        <Route path='/login/staff' components={StaffLogin} />
        <Route path='user/admin' component={App} >

        </Route>
        <Route path='user/staff' component={Staff} >

        </Route>
      </Router>
    )
  }
}

export default Rrouters;
