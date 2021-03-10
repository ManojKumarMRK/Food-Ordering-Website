import React, { Component } from 'react';
import '../../styles/home.css';
import {withRouter} from 'react-router-dom'

class Widget extends Component {
    
    //routing to search page after clicking
    clickhandle=()=>{
        const selectedCity = this.props.selectedCity;
        this.props.history.push("/search?type="+this.props.name+"&city="+selectedCity);

    }

    render() {
        
      
      return (
        <div className="col-sm-12, col-lg-4" onClick={this.clickhandle}>
        <div className="boxes">
            <div className="box-img">
                <img src={require('../../assets/'+this.props.name+'.png')} alt={this.props.name} className="box-img_img"/>
            </div>
            <div className="box-content">
                <p className="box-content_title">{this.props.name}</p>
                <p className="box-content_des">Start your day with 
                   exclusive breakfast 
                   options</p>
            </div>

        </div>
     </div>
      );
    }
}

export default withRouter(Widget); 