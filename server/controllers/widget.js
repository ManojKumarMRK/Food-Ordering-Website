const Restraunt = require('../models/restraunt');

//controller to provide meal types
exports.getWidget = (req,res,next) =>{
  Restraunt.distinct('type')
   
  .then(products => {
      res.json({"widgets" : products})
    })
  .catch(err => console.log(err));
}

//controller to provide available cities
exports.getCities = (req,res,next) =>{
  Restraunt.distinct('city_name')
   .then(products => {
      res.json({"cities" : products})
    })
  .catch(err => console.log(err));
}