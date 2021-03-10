import React, { Component } from 'react';
import AuthContext from '../../shared/authContext'
const axios = require('axios');
const style = require('../../styles/modal');


class contactModal extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {name : undefined,
                  mobileno : undefined,
                address : undefined,
              orderPlaced : false};
  }
  
  //handling input change
  handleInputChange = (type,val) =>{
    var logindetails = {}
    logindetails[type] = val
    this.setState(logindetails);
    console.log(this.state)
  }
  
  //not using this -- for template for future
  logInFun = () =>{
    
    axios({
      method: 'post',
      url: 'http://localhost:6556/login',
      headers : {'Content-Type' : 'application/json'},
      data : this.state
    }).then((res) =>{
      var AuthContext = this.context;
      AuthContext.login(res.data.userid, res.data.token, res.data.username);
      this.props.close()
    }).catch((err) => {
      console.log(err)
    })
  }
    
  //closing the modal
  closeModal = () =>{
        this.props.close()
  }

  //opening order successfull modal  
  orderState = () =>{
    var AuthContext = this.context;
      const newcart = this.props.cart.filter((item) => {
        return item.quantity !== 0
      })
      axios({
        method: 'post',
        url: 'http://localhost:6556/order',
        headers : {'Content-Type' : 'application/json', 'Authorization' : 'Bearer '+ AuthContext.token},
        data : {
          name : this.state.name, mobile : this.state.mobileno, address : this.state.address, items : newcart
        }
      }).then((res) =>{
        this.props.place()
      }).catch((err) => {
        console.log(err)
      })
      
      
  }
   
  render() {
      return (
        
        <React.Fragment>
          <div style={{"width" : "100%"}}><button onClick={this.closeModal} style={style.customStyles.closebar}>×</button></div>
          <h6 style={style.customStyles.signUp}>Contact Details</h6>
          <input type='text' style={style.customStyles.modalinput} placeholder="Name" onInput={(e)=>this.handleInputChange('name',e.target.value)}></input>
          <input type='text' style={style.customStyles.modalinput} placeholder="Mobile no." onInput={(e)=>this.handleInputChange('mobileno',e.target.value)}></input>
          <textarea style={style.customStyles.modaltextarea} placeholder="Address" onInput={(e)=>this.handleInputChange('address',e.target.value)} rows="4"></textarea>
          <div style={{"text-align" : "center"}}><button  style={style.customStyles.signupbutton} onClick={this.orderState}>Place Order</button></div>
        </React.Fragment>
    
      );
    }
}
contactModal.contextType = AuthContext;
  
  
export default contactModal;
  