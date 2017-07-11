//This file sets up a JSON schema using mongoose for each user, as well as their corresponding queries.

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//Import the config file for the user database
const config = require('../config/database');

//Schema for the users
const userSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});

//Exports the user with paramaters for the user and schema related to it
const User = module.exports = mongoose.model('User', userSchema);

//Sets up queries to find users either by ID (getUserByID) or username (getUserByUserName)
module.exports.getUserByID = function(id, callback){
    User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
    const query = {username: username};
    User.findOne(query, callback);
}

//Generates a salt key using bcrpyt for information encryption
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err,salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err; //:O
            newUser.password = hash;
            newUser.save(callback);
        })
    });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        if(err) throw err;
        callback(null, isMatch);
    });
}