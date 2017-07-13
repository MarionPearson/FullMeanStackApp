const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

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
            res.json({success: true, msg:'User Registered'});
        }
    })
});

//Routing for authentication
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    User.getUserByUsername(username, (err, user) => {
        if(err) throw err;
        if(!user){
            return res.json({success: false, msg: 'User not found'});
        }

        User.comparePassword(password, user.password, (err, isMatch) => {
            if(err) throw err;
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //1 week expiration
                });
                res.json({
                    success: true,
                    token: 'JWT ' + token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });

            }
            else {
                return res.json({success: false, msg: 'Incorrect Password'});
            }
        });

    });
});

//Routing for profile information
//passport.authenticate protects the route
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
    res.json({user: req.user});
});


module.exports = router;
