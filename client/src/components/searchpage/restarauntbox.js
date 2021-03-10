import React, { Component } from 'react';
import '../../styles/search.css';
import {withRouter} from 'react-router-dom';


class Resbox extends Component {
  
  //converting array of cuisine data to string
  cuisine = () => {
    var cuisarr =[]
    for(var i=0;i<this.props.data.Cuisine.length;i++){
         cuisarr.push(this.props.data.Cuisine[i].name);
    }
    return cuisarr;
  }
  
  //opening details page on click
  showDetails=(id)=>{
    
    this.props.history.push('/details?id='+this.props.data._id);
  }
  
  render() {
      const resName = this.props.data.name;
      const resArea = this.props.data.locality;
      const mealType = this.props.type;
      const cost = this.props.data.cost;
      const resadd = this.props.data.contact_number;
      const resId = this.props.data._id;
      
      return (
        <div className="searchRestarantBox" onClick={() => this.showDetails(resId)}>
                <div className="img">
                    <img src={require('../../assets/'+ mealType +'.png')} alt="Img not found" className="restrauntImg"/>
                </div>
                
                <div className="details">
                    <p className="resnameSearch">{resName}</p>
                    <p className="area">{resArea}</p>
                    <p className="addr">{resadd}</p>
                </div>
                
                <div className="que">CUISINES:<br/>COST FOR TWO:</div>
                    
                <div className="ans">{this.cuisine().join()}<br/>{"₹"+cost.toString()}</div>
                
        </div>
      );
    }
  }
  
export default withRouter(Resbox);
  