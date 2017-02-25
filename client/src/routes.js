import React, { PropTypes } from 'react';
import { Router , Route,browserHistory,IndexRoute} from 'react-router'

import App from './App';//admin 管理界面
import Staff from './Staff';//staff 职员后台界面
import AdminLogin from './components/login/NormalLoginForm';
//import StaffLogin from './components/staffLogin/index';

import AllYuanGong from './components/allYuanGong.js';
import EditYuanGong from './components/editYuanGong.js';

import AllCars from './components/allCars';
//import AddCars from './components/addCars';
import EditCars from './components/editCars';
class Rrouters extends React.Component {
  render () {
    return(
      <Router history={browserHistory}>
        <Route path='/' components={AdminLogin} />
        <Route path='user/admin' component={App} >
          <Route path='/all-yuangong' component={AllYuanGong}/>
          <Route path='/edit-yuangong' component={EditYuanGong}/>
          
          <Route path='/all-cars' component={AllCars}/>
          <Route path='/edit-cars' component={EditCars}/>

        </Route>
        <Route path='user/staff' component={Staff} >

        </Route>
      </Router>
    )
  }
}

export default Rrouters;
