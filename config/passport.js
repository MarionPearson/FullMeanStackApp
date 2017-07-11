const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('./database');

//This is a config file for the webtokens gained from passport
//Config templated from npmjs.com/package/passport-jwt, with tweaks by the wonderful Traversy Media

module.exports = function(passport){
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.getUserByID(jwt_payload._doc._id, (err, user) => {
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null,user);
            }
            else{
                return done(null,false);
            }
        })
    }));
}