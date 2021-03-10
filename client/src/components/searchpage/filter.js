import React, { Component } from 'react';
import '../../styles/search.css';
const axios = require('axios');

class Filter extends Component {
  constructor(props) {
    super(props);
    
    this.state = {cities: []};
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleCuisineChange = this.handleCuisineChange.bind(this);
  }
  
  //component did mount
  componentDidMount(){
    //initial call for data
    axios({
      method: 'get',
      url: 'http://localhost:6556/cities',
      headers : {'Content-Type' : 'application/json'}
    }).then((res) =>{
      this.setState({cities : res.data.cities})
      console.log(this.state)
    }).catch((err) => {
      console.log(err)
    })

  }
  
  //functions for handling filter and sort changes
  handleSortChange = (sortOrder) => {
    this.props.onFilterDataChange("sort",sortOrder)   
  }
  
  handleCostChange = (min, max) => {
    this.props.onCostChange(min,max)
  }

  handleLocationChange = (event) => {
    this.props.onFilterDataChange('city_name',event.target.value)
  }

  handleCuisineChange = (event) => {
    const target = event.target;
    var value = target.value;
    console.log(value)
    if(target.checked){
        
        this.props.onCuisineChange(value,0)  //add
    }else{
        
        this.props.onCuisineChange(value,1)  //remove
    }
    
  }

  render() {
      return (
        <div className="filterSelect">
        <h4 className="filtermhead">Filters</h4>
        <p className="filtershead">Change Location</p>
        <div className="custom-select-search" >
            <select onChange={this.handleLocationChange} >
              
              {
                        this.state.cities.map((city) =>{
                          if(city === this.props.selectedCity){
                            return <option value={city} selected>{city}</option>
                          }
                          else{
                            return <option value={city}  >{city}</option>
                          }
                        
                        })
                     }
              
            </select>
          </div>
          <p className="filtershead">Cuisine</p>
          <input type="checkbox" id="NorthIndian" name="NorthIndian" className="checkbox" value="northindian" onChange ={this.handleCuisineChange}/>
          <label for="NorthIndian" className="checkboxl">North Indian</label><br/>
          <input type="checkbox" id="SouthIndian" name="SouthIndian" className="checkbox" value="southindian" onChange ={this.handleCuisineChange}/>
          <label for="SouthIndian" className="checkboxl">South Indian</label><br/>
          <input type="checkbox" id="Chinese" name="Chinese" className="checkbox" value="chinese" onChange ={this.handleCuisineChange}/>
          <label for="Chinese" className="checkboxl">Chinese</label><br/>
          <input type="checkbox" id="FastFood" name="FastFood" className="checkbox" value="fastfood" onChange ={this.handleCuisineChange}/>
          <label for="FastFood" className="checkboxl">Fast Food</label><br/>
          <input type="checkbox" id="StreetFood" name="StreetFood" className="checkbox" value="streetfood" onChange ={this.handleCuisineChange}/>
          <label for="StreetFood" className="checkboxl">Street Food</label><br/>
          
          <p className="filtershead">Cost for two</p>
          <input type="radio" id="cost0" name="cost" className="checkbox" onChange ={()=>this.handleCostChange(0,500)}/>
          <label for="cost0" className="checkboxl" >Less than ₹500</label><br/>
          <input type="radio" id="cost1" name="cost" className="checkbox" onChange ={()=>this.handleCostChange(501,1000)}/>
          <label for="cost1" className="checkboxl" >₹500 to ₹1000</label><br/>
          <input type="radio" id="cost2" name="cost" className="checkbox" onChange ={()=>this.handleCostChange(1001,1500)}/>
          <label for="cost2" className="checkboxl" >₹1000 to ₹1500</label><br/>
          <input type="radio" id="cost3" name="cost" className="checkbox" onChange ={()=>this.handleCostChange(1501,2000)}/>
          <label for="cost3" className="checkboxl" >₹1500 to ₹2000</label><br/>
          <input type="radio" id="cost4" name="cost" className="checkbox" onChange ={()=>this.handleCostChange(2001,99999)}/>
          <label for="cost4" className="checkboxl" >₹2000 +</label><br/>
          
          <h4 className="filtermhead">Sort</h4>
          <input type="radio" id="sort1" name="sort" className="checkbox" onChange ={()=>this.handleSortChange(1)}/>
          <label for="sort1" className="checkboxl">Low to High</label><br/>
          <input type="radio" id="sort2" name="sort" className="checkbox" onChange ={()=>this.handleSortChange(-1)}/>
          <label for="sort2" className="checkboxl">High to Low</label><br/>
          
    </div>
        
      );
    }
}
  
export default Filter;
  