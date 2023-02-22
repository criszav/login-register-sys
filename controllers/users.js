const User = require('../models/user');


// Getting the register form
const renderRegister = (req, res) => {
    res.render('register');
}

// Register a new user
const register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = await new User({ email, username });
        const newUser = await User.register(user, password);
        console.log(newUser);
        req.flash('success', 'Welcome to the secret page!');
        res.redirect('/secret');
    } catch (error) {
        req.flash('error', error.message);
        res.redirect('register');
    }
}

// Getting the login form
const renderLogin = (req, res) => {
    res.render('login');
}

const login = (req, res) => {
    req.flash('success', 'Welcome back!');
    res.redirect('/secret')
}

const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye, thanks for your visit!');
        res.redirect('/login');
    });
}

// "Secret" page
const renderSecret = (req, res) => {
    res.render('secret');
}


module.exports = {
    renderRegister,
    register,
    renderLogin,
    login,
    logout,
    renderSecret
};