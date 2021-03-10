import React, { Component } from 'react';

const style = require('../../styles/modal');


class successModal extends Component {
    
  //closing modal
  closeModal = () =>{
    this.props.close()
  }

  render() {
      return (
        
        <React.Fragment>
          <div style={{"width" : "100%"}}><button onClick={this.closeModal} style={style.customStyles.closebar}>×</button></div>
          <div style={style.customStyles.success}>Order Placed Seccessfully!</div>
          
        </React.Fragment>
    
      );
    }
  }
  
  
export default successModal;
  