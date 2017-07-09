const express = require('express');
const router = express.Router();

//Routing for user registration
router.get('/register', (req, res, next) => {
    res.send('REGISTERED');
});

//Routing for authentication
router.post('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATED');
});

//Routing for profile information
router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

//Routing for validation
router.get('/validate', (req, res, next) => {
    res.send('VALIDATED');
});

module.exports = router;
