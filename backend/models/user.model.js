const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
        unique: false,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        unique: false,
        trim: false
    },
    role: {
        type: String,
        required: true,
        unique: false,
        trim: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

module.exports = User;