import React, { Component } from 'react';
import '../../styles/customtabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MenuModal from '../detailspage/menuModal';
import '../../styles/details.css';
import AuthContext from '../../shared/authContext';
import Modal from 'react-modal';
import Contactmodal from '../../components/detailspage/contactModal';
import Successmodal from '../../components/detailspage/successmodal'

const style = require('../../styles/modal');
const axios = require('axios');


class Detailtabs extends Component {

  constructor(props){
    super(props);
    this.state = {cart : [], menu : [], isContactOpen : undefined}
  }

  componentDidMount() {
    const id = this.props.id;
    //initail call for getting data
    axios({
      method: 'get',
      url: 'http://localhost:6556/restraunt/id/'+id,
      headers : {'Content-Type' : 'application/json'},
      
    }).then((res) =>{
      this.setState({menu : res.data.restraunt.menu})
      
    }).catch((err) => {
      console.log(err)
    })
  }

  //adding the items to cart state
  addC = (dishS,cost) =>{
    var newCart = this.state.cart
    var duplicate = false
    if(newCart.length === 0) {
      newCart.push( {res: this.props.name,dish : dishS,cost : cost,quantity : 1})
    }
    else{
      for (var i=0;i<newCart.length;i++){
        if(newCart[i].res === this.props.name && newCart[i].dish ===dishS ){
          newCart[i].quantity += 1
          duplicate = true
          break
        }
      }
      if(!duplicate){
        newCart.push( {res: this.props.name,dish : dishS,cost : cost,quantity : 1})
      }
    }
    this.setState({cart : newCart})
  };

  //removing the item from the cart
  removeC = (dishS,cost) =>{
    var newCart = this.state.cart
    if(newCart.length > 0){
      for (var i=0;i<newCart.length;i++){
        if(newCart[i].cost === cost && newCart[i].dish ===dishS ){
          newCart[i].quantity -= 1
          break
        }
      }
    }
    this.setState({cart : newCart})
  };
  
  //pay now segment handling
  paynow = () =>{
    const cart = this.state.cart
    if(cart.length > 0){
      var subTotal = 0;
      for (var i=0;i<cart.length;i++){
        subTotal += cart[i].cost*cart[i].quantity
      }
      if(subTotal>0){
        return (
        <div className="paynow">
          <div className='menuleft'>
          <p className='paynowpara'>{'Subtotal: '+subTotal+'₹'}</p>
          </div>
          <div className='menuright'> 
          <button className='paynowbutt' onClick={this.payfunc}>Pay Now</button>
          </div>
        </div>
        )
      }
    }
  }
  
  //opening contact form after clicking paynow
  payfunc = () =>{
    var AuthContext = this.context;
    if(AuthContext.isLoggedIn === true){
      this.setState({isContactOpen : 'contact'})
    }
    else{
      AuthContext.openModalS();
    }
  }
  
  //close modal function
  closeModal = () =>{
   this.setState({isContactOpen : undefined})
  }

  //place order function which procedes with order
  placeOrder =() =>{
   this.setState({isContactOpen : 'success'})

  }
    
  render() {
    
      return (
        <React.Fragment>
        <Tabs>
        <TabList>
          <Tab>Overview</Tab>
          <Tab>Contact</Tab>
          <Tab>Place Order Online</Tab>
        </TabList>
     
        <TabPanel>
                <h1 className="mainhead">About this place</h1>
                <h2 className="subhead">Cuisine</h2>
                <h2 className="cuisine">{this.props.cuisine}</h2>
                <h2 className="subhead">Average cost</h2>
                <h2 className="cost">{'₹'+this.props.cost+' for two people (approx.)'} </h2>
        </TabPanel>
        <TabPanel>
                <h1 className="mainhead">Contact Details</h1>
                <h2 className="subhead">Phone</h2>
                <h2 className="phone">+91 114004566 </h2>
                <h2 className="subhead">Address</h2>
                <h2 className="address">{this.props.address}</h2>
        </TabPanel>
        <TabPanel>
                <h1 className="mainhead">{this.props.name+"'s Menu"}</h1>
                
                {this.state.menu.map((item) => {
                        return <MenuModal item ={item} add={this.addC} remove={this.removeC}/>
                })}
                {this.paynow()}
        </TabPanel>
      </Tabs>
      <Modal isOpen={this.state.isContactOpen === 'contact'} style={style.customStyles}>
          <Contactmodal close = {this.closeModal} place = {this.placeOrder} cart = {this.state.cart}/>
      </Modal>
      <Modal isOpen={this.state.isContactOpen === 'success'} style={style.customStyles}>
          <Successmodal close = {this.closeModal} />
      </Modal>
      
     </React.Fragment>
        
      );
    }
  }Detailtabs.contextType = AuthContext;
  
  export default Detailtabs;
  