const express = require('express');
const User = require('../models/User');
const { query, validationResult, body } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'Happyisagoodb$oy';


// Create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valis password').isLength({min: 5})
], async (req, res)=>{
    //If there are errors, return Bad request and the errors
    try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
    //Check wheather the user with this email exists already
    let user = await User.findOne({email:req.body.email});
    if (user) {
        return res.status(400).json({error: "Sorry a user with this email already exist"})
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
    });

    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    res.json({authtoken});
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router