import React from 'react';
import Login from './components/login/index';
import QueueAnim from 'rc-queue-anim';
import NormalLoginForm from './components/login/NormalLoginForm'


class App extends React.Component {

  render () {
    return(
      <div style={{width:"50%",margin:"100px auto 0"}}>
      
          <NormalLoginForm />


      </div>
    )
  }
}



export default App;
