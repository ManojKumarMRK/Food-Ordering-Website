import React, { Component } from 'react';
import AuthContext from '../../shared/authContext'
const axios = require('axios');

const style = require('../../styles/modal');


class signUpModal extends Component {

  constructor(props) {
    super(props);
    
    this.state = {name: undefined,
                  email : undefined,
                  mobile : undefined,
                  password : undefined,
                  validationerror : false};
  }
  handleInputChange = (type,val) =>{
    var signupdetails = {}
    signupdetails[type] = val
    this.setState(signupdetails);
  }

  signUpFun = () =>{
    
    axios({
      method: 'post',
      url: 'http://localhost:6556/users',
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
    
  closeModal = () =>{
        this.props.close()
  }
    
  changeModal = () =>{
        this.props.change('login')
  }

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
          <h6 style={style.customStyles.signUp}>Sign Up</h6>
          <input type='text' style={style.customStyles.modalinput} placeholder="User Name" onChange={(e)=>this.handleInputChange('name',e.target.value)}></input>
          <input type='email' style={style.customStyles.modalinput} placeholder="E-mail Id" onChange={(e)=>this.handleInputChange('email',e.target.value)}></input>
          <input type='text' style={style.customStyles.modalinput} placeholder="Mobile no.(10 digit)" onChange={(e)=>this.handleInputChange('mobile',e.target.value)}></input>
          <input type='password' style={style.customStyles.modalinput} placeholder="Password(min. 7 digit)" onChange={(e)=>this.handleInputChange('password',e.target.value)}></input>
          {this.validationErr()}
          <div style={{"text-align" : "center"}}><button onClick={this.signUpFun} style={style.customStyles.signupbutton}>Sign Up</button></div>
          <div style={style.customStyles.modalcenter}>
            <p style={style.customStyles.modalalready}>Already have Account?</p>
            <button onClick={this.changeModal} style={style.customStyles.signupbutton2}>Log In</button>
          </div>
          </React.Fragment>
          
          
        
    
      );
    }
  }
  signUpModal.contextType = AuthContext;
  
export default signUpModal;
  