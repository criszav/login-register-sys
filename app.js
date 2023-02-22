// Mientras no estemos en producción, obten 'dotenv' variables
if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local');

const userRoutes = require('./routes/users');
const User = require('./models/user');

const flash = require('connect-flash');


// MongoDB connection
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/login-register-system');

const db = mongoose.connection; // Acceso a la conexión creada por default
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
    console.log("Base de datos conectada exitosamente");
})


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));


// Seteando la session (express-session)
const sessionConfig = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}
app.use(session(sessionConfig));
app.use(flash());


// Configurando passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Indica que usaremos la estrategia 'Local Strategy' en el modelo User
passport.use(new LocalStrategy(User.authenticate()));

// Indica cómo vamos a almacenar un user en la sesion
passport.serializeUser(User.serializeUser());
// Indica cómo vamos a quitar un user de la sesion
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

// User Routes
app.use('/', userRoutes);


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App is listening on PORT ${PORT}`);
})