import React from 'react';
//admin 后台管理界面
import Header from './share/header/Header';
import LeftNav from './components/leftnav/LeftNav';



class App extends React.Component {

  render () {
    let styles={
      root:{
        width:"100%",
        height:"100vh"
      }
    }
    return(
      <div style={styles.root}>
        <Header />
        <div className="main-container">
          <div className="left-nav">
            <LeftNav />
          </div>
          <div className="right-content" key='1'>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}



export default App;
