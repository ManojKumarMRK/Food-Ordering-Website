import React, { Component } from 'react';
import AuthContext from '../../shared/authContext';

const axios = require('axios');
const style = require('../../styles/modal');


class logInModal extends Component {
  constructor(props) {
    super(props);
    
    this.state = {email : undefined,
                  password : undefined,
                  validationerror : false};
  }
  
  //handling input change
  handleInputChange = (type,val) =>{
    var logindetails = {}
    logindetails[type] = val
    this.setState(logindetails);
  }
  
  //logging in function
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
        this.setState({validationerror : true});
    })
  }
  
  //closing the modal function
  closeModal = () =>{
        this.props.close()
  }
  
  //changing to signin modal function
  changeModal = () =>{
        this.props.change('signup')
  }
  
  //handling invalid credentials  
  validationErr = () =>{
      if(this.state.validationerror === true){
        return <div style={style.customStyles.error}>Invalid Credentials!</div>
      }
      else{
        return null
      }
  }
  
  
  render() {
    return (
        
      <React.Fragment>
          <div style={{"width" : "100%"}}><button onClick={this.closeModal} style={style.customStyles.closebar}>×</button></div>
          <h6 style={style.customStyles.signUp}>Log In</h6>
          <input type='email' style={style.customStyles.modalinput} placeholder="E-mail Id" onChange={(e)=>this.handleInputChange('email',e.target.value)}></input>
          <input type='password' style={style.customStyles.modalinput} placeholder="Password(min. 7 digit)" onChange={(e)=>this.handleInputChange('password',e.target.value)}></input>
          {this.validationErr()}
          <div style={{"text-align" : "center"}}><button onClick={this.logInFun} style={style.customStyles.signupbutton}>Log In</button></div>
          <div style={style.customStyles.modalcenter}>
            <p style={style.customStyles.modalalready}>Don't have account?</p>
            <button onClick={this.changeModal} style={style.customStyles.signupbutton2}>Create Account</button>
          </div>
      </React.Fragment>
    
      );
    }
  }
  logInModal.contextType = AuthContext;
  
export default logInModal;
  