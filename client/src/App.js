import React from 'react';
//admin 后台管理界面
import Header from './share/header/Header';
import LeftNav from './components/leftnav/LeftNav'


class App extends React.Component {

  render () {
    return(
      <div>
        <Header />
        <div className="main-container">
          <div className="left-nav">
            <LeftNav />
          </div>
          <div className="right-content"></div>
        </div>
      </div>
    )
  }
}



export default App;
