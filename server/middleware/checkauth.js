const jwt = require('jsonwebtoken');

//adding authentication middleware
module.exports = (req,res,next) => {
    try{
        const authToken = req.headers.authorization.split(' ')[1];
        if(!authToken){
            throw new Error('Authentication failed!');
        }
        const decodedToken = jwt.verify(authToken,'thisisdiabolical');
        req.userData = {userId: decodedToken._id, token: authToken};
        next()

    }
    catch(err){
        throw new Error('Authentication failed!')

    }
}