const Restraunt = require('../models/restraunt');

//getting all restaraunt details by city name
exports.getResByCity = (req, res, next) => {
    const city = req.params.city;
    
    Restraunt.find({"city_name" : city})
     
    .then(products => {
        
        res.json({"restraunts" : products})
      })
    .catch(err => console.log(err));
};

//get restaraunt detail by id
exports.getResById = (req, res, next) => {
  const id = req.params.id;
  
  Restraunt.findOne({"_id" : id})
   
  .then(products => {
      
      res.json({"restraunt" : products})
    })
  .catch(err => console.log(err));
};

//get restaraunt based on applied filter
exports.getResByFilters = (req, res, next) => {
  
  const city = req.body.city_name ? req.body.city_name : "delhi";
  const min_price = req.body.mincost ? req.body.mincost : 0;
  const max_price = req.body.maxcost ? req.body.maxcost : 999999;
  const sort_order = req.body.sort ? req.body.sort : 1;
  const page = req.body.page ? req.body.page : 1;
  const limit_per_page = 2;
  const skips = ((page*2)-limit_per_page);
  const cuisine_types = req.body.cuisine ? req.body.cuisine : ["northindian", "southindian", "fastfood", "streetfood", "chinese"]
  const meal_type = req.body.type ? req.body.type : ["breakfast" ,"lunch", "dinner", "snacks", "drinks", "nightlife"];

  
  Restraunt.find({"city_name" : city, "cost" : {$gt : min_price, $lt : max_price} ,Cuisine: {$elemMatch: {name: {$in: cuisine_types}}},type: {$elemMatch: {name:{$in:meal_type} }}})
  .sort({"cost" : sort_order})
  .limit(limit_per_page)
  .skip(skips)
   
  .then(products => {
      
      res.json({"restraunts" : products})
    })
  .catch(err => console.log(err));
};

//getting page no. based on applied filter
exports.getPagenos = (req, res, next) => {
  
  const city = req.body.city_name ? req.body.city_name : "delhi";
  const min_price = req.body.mincost ? req.body.mincost : 0;
  const max_price = req.body.maxcost ? req.body.maxcost : 999999;
  const cuisine_types = req.body.cuisine ? req.body.cuisine : ["northindian", "southindian", "fastfood", "streetfood", "chinese"]
  const meal_type = req.body.type ? req.body.type : ["breakfast" ,"lunch", "dinner", "snacks", "drinks", "nightlife"];

  
  Restraunt.find({"city_name" : city, "cost" : {$gt : min_price, $lt : max_price} ,Cuisine: {$elemMatch: {name: {$in: cuisine_types}}},type: {$elemMatch: {name: {$in:meal_type}}}})
  .countDocuments()
   
  .then(products => {
      const pages = Math.ceil(products/2);
      res.json({"restaraunts" : products, "pages" : pages})
    })
  .catch(err => console.log(err));
};

