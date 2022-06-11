const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }, password: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    }, description:{
        type: String,
        required: true,
        trim: true,
    }, number:{
        type: Number,
        required: false,
        trim: true,
    }, date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('user', userSchema)