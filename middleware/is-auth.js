const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        const error = new Error('Not Authenticated1');
        error.statusCode = 401;
        throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken;
    try{
        decodedToken = jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
    } catch(err){
        err.statusCode = 501;
        err.message = 'Either the token or the secret key is wrong (may be the token has expired)!!!';
        throw err;
    }
    if(!decodedToken){
        const error = new Error('Not Authenticated2');
        error.statusCode = 401;
        throw error;
    }
    req.userId = decodedToken.userId;
    next();
};