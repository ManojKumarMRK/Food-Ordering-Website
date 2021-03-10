import React, { Component  } from 'react';
import Router from './router';
import AuthContext from './shared/authContext';



class App extends Component {
  constructor(props){
    super(props);
    this.state= {isLoggedIn : false, userName : null, userId : null, token : null, openedModal : null, expirationDate : null}

  }

  componentDidMount() {
    const localData = JSON.parse(localStorage.getItem('userData'));
    
    if(localData && localData.token && new Date(localData.expiration) > new Date()){
      this.login(localData.id,localData.token,localData.name,new Date(localData.expiration));

    }

  }

  //functions to manage and update authcontext
  login = (id,token,name,expire) =>{
    this.setState({isLoggedIn : true, userName : name, userId : id, token : token})
    const tokenExpirationDate = expire || new Date(new Date().getTime() + 1000*60*60);
    this.setState({expirationDate : tokenExpirationDate})
    localStorage.setItem('userData',
    JSON.stringify({id : id,token : token,name : name, expiration : tokenExpirationDate.toISOString()}));
  }
  logout = () =>{
    this.setState({isLoggedIn : false, userName : null, userId : null, token : null, expirationDate : null});
    localStorage.removeItem('userData')
  }
  openModalS = () =>{
    this.setState({openedModal : "signup"})
  }
  openModalL = () =>{
    this.setState({openedModal : "login"})
  }
  closeModal = () =>{
    this.setState({openedModal : undefined})
  }


  
  render() {
    return (
      <AuthContext.Provider
      value = {{isLoggedIn: this.state.isLoggedIn, userId: this.state.userId,
        userName : this.state.userName,
        token: this.state.token, 
        openedModal: this.state.openedModal, 
        login: this.login, 
        logout: this.logout, 
        openModalS: this.openModalS, 
        openModalL: this.openModalL,
        closeModal: this.closeModal}}>
      
      <Router/>
    </AuthContext.Provider>
      
    );
  }
}

export default App;
