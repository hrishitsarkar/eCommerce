const jwt = require('jsonwebtoken');
const config = require('../config/config');


const verifyToken = async(req,res,next) => {
    //token can come from body,query or headers
    const token = req.body.token || req.query.token || req.headers["authorization"]; 

    if(!token){
        res.status(200).send({success : false , msg : "A token is required for authentication"});
    }
    try {
        const decode = await jwt.verify(token,config.secret_jwt);
        req.user = decode;
    } catch (error) {
        res.status(400).send({msg : "Invalid token"});
    }
    return next();
}

module.exports = verifyToken;