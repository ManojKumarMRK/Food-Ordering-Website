import React, { Component } from 'react';
import '../styles/search.css';
import Filter from '../components/searchpage/filter';
import Resbox from '../components/searchpage/restarauntbox';
import Pagination from '../components/searchpage/pagination';
import queryString from 'query-string';
var parse = require('html-react-parser');
const axios = require('axios');


class Search extends Component {
  //adding construction 
  constructor(){
    super();
    
    //adding states
    this.state = {render: false, 
                  text : "<span id=\"arrow\">&#9662;</span>",
                  filterData : {
                    city_name : "delhi",
                    type : undefined,
                    cuisine : undefined,
                    mincost : undefined,
                    maxcost : undefined,
                    sort : undefined,
                    page : 1
                  },
                  pagination:{
                    restarants: [],
                    pages: []
                  },
                  restarants: []
                }
    
  }

  //axios call to get page nos. to new result
  axiosPagesCall = () => {
    axios({
      method: 'post',
      url: 'http://localhost:6556/restraunt/pages',
      headers : {'Content-Type' : 'application/json'},
      data: JSON.stringify(this.state.filterData) 
    }).then((res) =>{
      const pagesArray = []
      const restarantArray = []
      for(var i=1; i<=res.data.pages; i++ ){
        pagesArray.push(i)
      }
      for(var j=1; j<=res.data.restaraunts; j++ ){
        restarantArray.push(j)
      }
      this.setState({pagination : {restarants : restarantArray, pages : pagesArray}})
      console.log(this.state.pagination)
    }).catch((err) => {
      console.log(err)
    })


  }
  
  //axios call to get new result
  axiosResultCall = () =>{
    axios({
      method: 'post',
      url: 'http://localhost:6556/restraunt/filter',
      headers : {'Content-Type' : 'application/json'},
      data: JSON.stringify(this.state.filterData) 
    }).then((res) =>{
      
      
      this.setState({restarants : res.data.restraunts})
      console.log(this.state.restarants)
    }).catch((err) => {
      console.log(err)
    })


  }
  
  //adding component did mount to render for default values
  componentDidMount(){
    const values = queryString.parse(this.props.location.search);
    const newFilter = this.state.filterData;
    newFilter.type = [values.type]
    newFilter.city_name = values.city
    this.setState({filterData : newFilter})
    //calling axios calls..
    this.axiosPagesCall()
    this.axiosResultCall()

  }
  
  //handling filter component visibility (for mobile screens)
  handleClick(){
    if(this.state.render === false){
      this.setState({render: !this.state.render, text : "<span id=\"arrow\">&#9652;</span>"}); 
    }
    else{
      this.setState({render: !this.state.render, text : "<span id=\"arrow\">&#9662;</span>"});
    }
    
    
  }
  
  //rendering filter component based on state..(mobile screen)
  renderFilter(){
    const selCity = this.state.filterData.city_name
    if(this.state.render === true){
      return <Filter onFilterDataChange={this.filterDataChange} 
                      onCostChange={this.costDataChange}
                      onCuisineChange={this.cuisineDataChange}
                      selectedCity = {selCity}/>
    }
    return null
  }
  
  //rendering filter component(desktop screen)
  renderFilterDesk(){
    const selCity = this.state.filterData.city_name
    
    if(window.innerWidth > 800){
      
      return <Filter onFilterDataChange={this.filterDataChange} 
                      onCostChange={this.costDataChange}
                      onCuisineChange={this.cuisineDataChange}
                      selectedCity = {selCity}/>
    }
    return null
  }
  
  //pagination functioning..
  pageChange = (pageno) =>{
      
      const newFilter = this.state.filterData;
      newFilter.page = pageno;
      this.setState({filterData: newFilter});
      console.log(this.state.filterData)
      //making axios call for next page result
      this.axiosResultCall()
  }
  
  //filter data change for some common properties
  filterDataChange = (key,value) =>{
    
    const newFilter = this.state.filterData;
    newFilter[key] = value;
    this.setState({filterData: newFilter});
    console.log(this.state.filterData)

    //making axios calls with new filter data
    this.axiosResultCall()
    this.axiosPagesCall()

  }
  
  //filter data change for some cost property
  costDataChange = (min,max) =>{
    console.log(min,max)
    const newFilter = this.state.filterData;
    newFilter.mincost = min;
    newFilter.maxcost = max;
    this.setState({filterData: newFilter});
    console.log(this.state.filterData)

    //making axios calls with new filter data
    this.axiosResultCall()
    this.axiosPagesCall()

  }

  //filter data change for some cuisine property
  cuisineDataChange = (cuis, current) =>{
    //current 0-> checked, 1-> unchecked
    if(this.state.filterData.cuisine){
      if(current === 0){
        const newFilter1 = this.state.filterData;
        newFilter1.cuisine.push(cuis);
        this.setState({filterData: newFilter1});
      }
      else if(current === 1){
      
        const newFilter2 = this.state.filterData;
        const arr = newFilter2.cuisine
        const removedarr = arr.filter(function(e) { return e !== cuis });
        if(removedarr.length === 0){
          newFilter2.cuisine = undefined
        }
        else{
        newFilter2.cuisine = removedarr;
        }
      
      
        this.setState({filterData: newFilter2});
      
      
      }
   
    }
    else{
      const newFilter3 = this.state.filterData;
      newFilter3.cuisine = [cuis]
      this.setState({filterData: newFilter3});

    }
    //making axios calls for new cuisine data
    this.axiosPagesCall()
    this.axiosResultCall()
  }
  
  //render function..
  render() {

      const selectedCity = this.state.filterData.city_name
      const mealType = this.state.filterData.type
      return (
        <div className="searchContainer">
          <div className ='title'>{mealType + ' places in '+selectedCity} </div>
            <div className="leftb">
              <div className="filterStateHolder">
      <button id="filterState" onClick={() => this.handleClick()}>Filter/Sort{parse(this.state.text)}</button>
              </div>
              {this.renderFilter()}
              {this.renderFilterDesk()}
            </div>
            <div className ="rigthb"> 
            
            {this.state.restarants.length > 0 ?this.state.restarants.map((restarant) =>{
                return <Resbox data={restarant} type ={mealType}/>
              }) : <div className='searchRestarantBox sorry'>Sorry, No results found!</div>}
            
              
              {this.state.pagination.pages.length > 0?
              <Pagination pages={this.state.pagination.pages} 
                          onChangePage={this.pageChange}
                            onFilterDataChange={this.filterDataChange}/> : null}
              
          </div>


        </div>
        
    
    );
  }
}

//exporting Search component..
export default Search;
  