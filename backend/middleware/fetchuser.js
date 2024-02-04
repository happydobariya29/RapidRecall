const jwt = require('jsonwebtoken');

require('dotenv').config();

const happy = process.env.JWT_SECRET;

const fetchuser = (req, res, next) => {
    //Get the user from the jwt token and id to req object
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({error:"Please Authenticate using a valid token"})
    }
    try{
        const data = jwt.verify(token,happy);
        req.user = data.user;
        next();
    } catch(error) {
        res.status(401).send({error:"Please Authenticate using a valid token"})
    }
}

module.exports = fetchuser;