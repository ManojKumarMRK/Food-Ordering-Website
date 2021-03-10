import React, { Component } from 'react';
import Modal from 'react-modal';
import AuthContext from '../shared/authContext'
import '../styles/navbar.css';
import Signupmodal from '../components/navbar/signupmodal';
import Loginmodal from '../components/navbar/loginmodal';

const style = require('../styles/modal');



class Navbar extends Component {
  
  constructor(){
    super();
    
    this.state= {activeModal : undefined};
    
  }
  
  
  

  closeModal = () =>{
    var AuthContext = this.context;
    AuthContext.closeModal();
    
  }

  
  openModalS = () =>{
    var AuthContext = this.context;
    AuthContext.openModalS()
    

  }
  openModalL = () =>{
    var AuthContext = this.context;
    AuthContext.openModalL()
    

  }

  logout = () => {
    var AuthContext = this.context;
    AuthContext.logout();
      
  }

  

    render() {
      
        return (
          

          <div className="topnav">
          <ul className="navul">
              <li  className="e">e!</li>
              
              <AuthContext.Consumer>
                {(context) => context.isLoggedIn ?  <li  className="right"><button className={"border"} onClick={this.logout}>Log Out</button></li> 
                : <li  className="right"><button className={context.openedModal === "login" ? "border" : ""} onClick={this.openModalL}>Login</button></li>}
                
              
              </AuthContext.Consumer>
              <AuthContext.Consumer>
        {(context) => context.isLoggedIn ?  <li  className="right"><button>{context.userName}</button></li>
                 : <li  className="right" ><button className= {context.openedModal === "signup" ? "border" : ""} onClick={this.openModalS}>Create Account</button></li>}
                
              
              </AuthContext.Consumer>
              
              
          </ul>
          <AuthContext.Consumer>
                {(context) =><Modal isOpen={context.openedModal === 'signup'} style={style.customStyles}>
           <Signupmodal close = {this.closeModal} change ={this.openModalL} />
          </Modal>}
              
          </AuthContext.Consumer>
          <AuthContext.Consumer>
                {(context) =><Modal isOpen={context.openedModal === 'login'} style={style.customStyles}>
           <Loginmodal close = {this.closeModal} change ={this.openModalS}/>
          </Modal>}
          </AuthContext.Consumer>
          
          
         
          
      </div>
        );
        

        

      
      
    }
}
Navbar.contextType = AuthContext;


  
export default Navbar;
  