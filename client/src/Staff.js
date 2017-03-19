import React, { PropTypes } from 'react';
import Header from './share/header/Header';
import StaffLeftNav from './components/leftnav/StaffLeftNav';

class Staff extends React.Component {
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
            <StaffLeftNav />
          </div>
          <div className="right-content" key='1'>
            { this.props.children }
          </div>
        </div>
      </div>
    )
  }
}

export default Staff;
