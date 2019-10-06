const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    profile_thumb: String,
    password: String
}, {
    toJSON:{
        virtuals: true,
    }
});

UserSchema.virtual('profile_thumb_url').get(function(){
    return `http://localhost:3333/files/${this.profile_thumb}`;
})

module.exports = mongoose.model('User', UserSchema);