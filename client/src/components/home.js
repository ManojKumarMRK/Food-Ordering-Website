import React, { Component } from 'react';
import Widgets from './homepage/widgets';
import '../styles/home.css';
import Optionbox from './homepage/optionbox';
const axios = require('axios');


class Home extends Component {
  constructor(props) {
    super(props);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.automate = this.automate.bind(this);
    this.state = {cities: [],
                  selectedCity : undefined,
                  resinCity: [],
                  filteredres : [],
                  showoptions : false};
  }
  
  componentDidMount(){
   
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

  handleLocationChange = (event) => {
    console.log(event.target.value)
    this.setState({selectedCity : event.target.value})
    axios({
      method: 'get',
      url: 'http://localhost:6556/restraunt/city/'+event.target.value,
      headers : {'Content-Type' : 'application/json'}
    }).then((res) =>{
      this.setState({resinCity : res.data.restraunts})
      
    }).catch((err) => {
      console.log(err)
    })
  }

  automate = (event) =>{
    var allres = this.state.resinCity;
    var key = event.target.value;
    var filteredres = allres.filter((res) => {
      return res.name.toLowerCase().indexOf(key.toLowerCase()) > -1
    })
    
    console.log(key, filteredres)
    this.setState({filteredres : filteredres,showoptions : true})
    
  }

  showOption = () =>{
    if(this.state.showoptions){
      if(this.state.filteredres.length === 0){
        return <div className='autooptions'>--no results found--</div>
      }
      else{
        return <div className='autooptions'>{this.state.filteredres.map((fil) => <Optionbox img={fil.thumb}
                                                                                            name ={fil.name}
                                                                                            area = {fil.locality}
                                                                                            id ={fil._id}/>)}
          
        </div>
      }
     
    }else{
      return null
    }
  }

  closeOption = ()=>{
    this.setState({showoptions : false})

  }
  
  render() {
    const cities = this.state.cities
    const selectedCity = this.state.selectedCity ? this.state.selectedCity : "delhi";
    
      return (
        <React.Fragment>
          
      
        <div className="imgholder">
       <div className="layer">
           <div className="edu">e!</div>
           <div className="des">Find the best restaurants, cafés, and bars</div>
           <div className="drops">
               <div className="search1"><select name="cars" id="cars" onChange={this.handleLocationChange}>
                     <option value="" hidden >Select city</option>
                     {
                        cities.map((city) =>{
                        return <option value={city}  >{city}</option>
                        })
                     }
    
                </select></div>
               <div className="search2">
                <div className="input-icons"> 
                    <i className="fa fa-search icon"> 
                  </i> 
                    <input className="input-field" 
                           type="text"
                           placeholder="Search restaurants"
                           onChange={this.automate}
                           onBlur = {this.closeOption}/> 
                           {this.showOption()}
                </div> 
               </div>
           </div>
           
       </div>
    </div>
          <Widgets selCity={selectedCity}/>
        </React.Fragment>
        
      );
    }
  }
  
  export default Home;
  