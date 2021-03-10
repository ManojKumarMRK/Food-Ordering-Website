import React, { Component } from 'react';
import '../styles/details.css';
import Detailtabs from '../components/detailspage/DetailTabs';
import queryString from 'query-string';
const axios = require('axios');


class Details extends Component {
  constructor(){
    super();
    this.state = { name: "", address :"", imgurl: "",  cost:"", cuisine:""};
  }

  cuisine = (arr) => {
    var cuisarr =[]
    for(var i=0;i<arr.length;i++){
         cuisarr.push(arr[i].name)
    }
    return cuisarr;
  }
  

  componentDidMount(){
    const values = queryString.parse(this.props.location.search)
   
    axios({
      method: 'get',
      url: 'http://localhost:6556/restraunt/id/'+values.id,
      headers : {'Content-Type' : 'application/json'},
      
    }).then((res) =>{
      
      const newState = {name : res.data.restraunt.name,
                          address : res.data.restraunt.address,
                          imgurl : res.data.restraunt.thumb,
                        cost : res.data.restraunt.cost,
                      cuisine : this.cuisine(res.data.restraunt.Cuisine).join(),
                      
                    }
                    
                  
      this.setState(newState)
      
    }).catch((err) => {
      console.log(err)
    })
    
  }

  
  
  render() {
    const url = this.state.imgurl
    const values = queryString.parse(this.props.location.search)
      return (
        <div className="container">
        <img src={url} alt={this.state.name} class="banner"/>
        <h1 class="resname">{this.state.name}</h1>
        <Detailtabs cost={this.state.cost} cuisine={this.state.cuisine} address={this.state.address}  name={this.state.name} id={values.id}/>
       </div>
      );
    }
}

export default Details;
  