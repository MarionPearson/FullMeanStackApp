const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

//Brings in the user schema for user information
const User = require('../models/user');

//Routing for user registration
router.post('/register', (req, res, next) => {
    //Grabs form information to be encrypted by bcrypt
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    })

    User.addUser(newUser, (err,user) =>{
        if(err){
            res.json({success: false, msg:'Registration failed'});
        }
        else{
            res.json({succes: true, msg:'User Registered'});
        }
    })
});

//Routing for authentication
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATED');
});

//Routing for profile information
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});


module.exports = router;
