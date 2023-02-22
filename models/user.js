const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');


// No esta agregado username ni password porque Passport-Local-Mongoose los agrega por defecto 
// En el caso de password, agrega 'hashed password' y el valor de 'salt'
const UserSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Must provide an email'],
        unique: true
    }
})

// Este plugin agrega el campo de username y password (hashed password y salt) a nuestro esquema
UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', UserSchema);