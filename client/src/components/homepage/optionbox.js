import React, { Component } from 'react';
import '../../styles/home.css';
import {withRouter} from 'react-router-dom'

class Optionbox extends Component {
    
    //routing to details page on click of option
    showDetails=()=>{
        console.log('clicked')
        this.props.history.push('/details?id='+this.props.id)
    
    
    }

    render() {
        
      
      return (
          <div className='optionBox' onMouseDown={this.showDetails}>
              <div className='optionBoxl'>
                  <img className='optionBoximg' src={this.props.img} alt='nope'></img>
              </div>
              <div className='optionBoxr'>
                  <div className='optionResname'>{this.props.name}</div>
                  <div className='optionResarea'>{this.props.area}</div>
              </div>
          </div>
        
      );
    }
}

export default withRouter(Optionbox); 