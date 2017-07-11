//Instantiate dependencies no ECMA :(
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Setting up the database connection for Mongo.
mongoose.connect(config.database);
// Test to verify connection
mongoose.connection.on('error', (err) => {
    console.log('Cannot connect to database. Error: ' + err);
})

const app = express();

const users = require('./routes/users');

const port = 3000;

// Allows CORS usage in the app. Any domain can use this API
app.use(cors());

//Connects the app to the future Angular application
app.use(express.static(path.join(__dirname, 'client'))); 

//Middleware for Body Parser
app.use(bodyParser.json())

//Middleware for Passport
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//Routing for application user files
app.use('/users', users);

//Home page routing
app.get('/', (req,res) =>{
    res.send("Page not found");
})

//Server initialization
app.listen(port, () => {
    console.log('Server running Port 3000');
});

