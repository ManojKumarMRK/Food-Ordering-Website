const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creating restaraunt schema
const restrauntSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  city_name: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  locality: {
    type: String,
    required: true
  },
  thumb: {
    type: String,
    required: true
  },
  cost: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  type: {
    types: [
      {
        mealtype: {
          type: String,
          required: true
        },
        name: { 
            type: String, 
            required: true }
        }
    ]
  },
  Cuisine: {
    cuisines: [
      {
        cuisinetype: {
          type: String,
          required: true
        },
        name: { 
            type: String, 
            required: true }
        }
      
    ]
  },
  menu : [{ 
      dish :{
          type : String,
          required : true

      },
      des :{
        type : String,
        required : true

    },
    cost :{
      type : String,
      required : true

  }
          
  }]
});



module.exports = mongoose.model('Restraunt', restrauntSchema, 'restraunt');