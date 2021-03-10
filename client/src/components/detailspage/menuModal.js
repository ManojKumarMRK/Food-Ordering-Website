import React, { Component } from 'react';
import '../../styles/details.css';


class menuModal extends Component {
  constructor(props){
    super(props);
    this.state = {buttonState : 0}
  }
  
  //quantity decresing
  quandec = () =>{
    if(this.state.buttonState>0){
      this.props.remove(this.props.item.dish,this.props.item.cost)
      this.setState({buttonState: this.state.buttonState-1})
    }
  }
  
  //quantity increasing
  quaninc = () =>{
    if(this.state.buttonState<10){
      this.props.add(this.props.item.dish,this.props.item.cost)
      this.setState({buttonState: this.state.buttonState+1})
    }
  }
  
  //managing order buttons
  orderButton = () =>{
    if(this.state.buttonState === 0){
      return <button className='addDish' onClick={this.quaninc}>Add</button>
    }
    else{
      return (<div className='addDish2'>
      <input type="button" className='indec' value="-" onClick={this.quandec}/>
      <input type="button" name="quantity" value={this.state.buttonState}  className="quantity" />
      <input type="button" className='indec' value="+" onClick={this.quaninc}/>
      </div>);
    }

  }
  render() {
    console.log(this.props.item)
      return (
        <div className='menuItem'>
          <div className="menuleft">
          <p className="vegetarianicon">⊡</p>
          <p  className="dish">{this.props.item.dish.toUpperCase()}</p>
          <p className="dishcost" >{this.props.item.cost+'₹'}</p>
          <p className="dishdes">{this.props.item.des}</p>
          </div>
          <div className="menuright">
          <div className="menuimg">
                    <img src={require('../../assets/'+this.props.item.dish+'.jpg')} alt="Img not found" className="dishImg"/>
                    {this.orderButton()}
          </div>
        </div>
      </div>
    );
  }
}
 
export default menuModal;
  