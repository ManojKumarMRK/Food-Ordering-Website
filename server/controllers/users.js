const User = require('../models/user');

//signup controller
exports.signup = async(req, res, next) => {
    
    name = req.body.name;
    email = req.body.email;
    mobile = req.body.mobile;
    password = req.body.password;
    const newuser = new User({name : name, email : email,mobile : mobile, password : password});
    try{
      await  newuser.save();
      const token = await newuser.createAuthTokens(newuser);
      res.json({userid : newuser._id, username : newuser.name,token : token});
      
    }catch(err){
        res.status(400).json({"message" : "validation error"});
    };
};

//login controller
exports.login = async(req, res, next) => {
    
 try{
    const user = await User.findByCredentials(req.body.email, req.body.password);
    const token = await user.createAuthTokens(user);
    res.json({userid : user._id, username : user.name,token : token});
    
  }catch(err){
      res.status(400).json({"message" : "validation error"});
  };
};

//logout controller
exports.logout = async(req, res, next) => {
    
  try{
     const userId = req.userData.userId;
     const userToken = req.userData.token;
     const user = await User.findById(userId);
     newTokens = user.tokens.filter((token) => {
     return token.token!==userToken});
     user.tokens = newTokens;
     await user.save();
     res.json({message : "Logged Out Successfully"});
     
   }catch(err){
     res.status(400).send(err);
   };
};

//clear all orders controller
exports.clear = async(req, res, next) => {
    
  try{
     const userId = req.body.userId;
     const user = await User.findById(userId);
     newOrder = []
     user.orders = newOrder;
     await user.save();
     res.json({message : "Cleared all orders!"});
     
   }catch(err){
     res.status(400).send(err);
   };
};

//order controller
exports.order = async(req, res, next) => {
    
  try{
     const userId = req.userData.userId;
     const user = await User.findById(userId);
     newOrder = {"name" : req.body.name,"mobile" : req.body.mobile,"address" : req.body.address,"items" : req.body.items};
     user.orders = user.orders.concat(newOrder);
     await user.save();
     res.json({message : "Order Added Successfully"});
     
   }catch(err){
     res.status(400).send(err);
   };
};
