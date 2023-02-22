const express = require('express');
const passport = require('passport');
const router = express.Router();
const usersController = require('../controllers/users');
const { isLoggedIn } = require('../middleware');


/* REGISTER */

router.route('/register')
    // Show the register form to the user
    .get(usersController.renderRegister)

    // Route to register a new user
    .post(usersController.register)


/* LOGIN */

router.route('/login')
    // Show the login form
    .get(usersController.renderLogin)

    // Route to login 
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), usersController.login);


// Logout
router.get('/logout', usersController.logout);

router.route('/secret')
    // Show the login form
    .get(isLoggedIn, usersController.renderSecret)


module.exports = router;