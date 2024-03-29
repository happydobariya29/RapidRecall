const express = require('express');
const User = require('../models/User');
const { query, validationResult, body } = require('express-validator');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

require('dotenv').config();

const happy = process.env.JWT_SECRET;


// Route : 01 Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser',[
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valis password').isLength({min: 5})
], async (req, res)=>{
    let success = false;

    //If there are errors, return Bad request and the errors

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array()});
    }
    try {
    // Check wheather the user with this email exists already
    let user = await User.findOne({email:req.body.email});
    if (user) {
        return res.status(400).json({success, error: "Sorry a user with this email already exist"});
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    //Create a new user
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
    const authtoken = jwt.sign(data, happy);
    success = true;
    res.json({success, authtoken});
    
    // .then(user => res.json(user))
    // .catch(err=> {console.log(err)
    // res.json({error: 'Please enter a unique value for email', message: err.message})})

    //Catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }
})

// Route : 02 Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login',[
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res)=>{
    let success = false; 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }

    const {email,password} = req.body;
    try{
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({error:"Please try to login with correct credentials"});
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error:"Please try to login with correct credentials"});
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, happy);
        success = true;
        res.json({success, authtoken});

    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }
})

// Route : 03 Get loggedin User Details using: POST "/api/auth/getuser".login required
router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error ");
    }
})
module.exports = router