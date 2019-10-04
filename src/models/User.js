const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    profile_thumb: String,
    password: String
});

module.exports = mongoose.model('User', UserSchema);