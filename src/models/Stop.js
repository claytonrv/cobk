const mongoose = require('mongoose');

const StopSchema = new mongoose.Schema({
    date: String,
    time: String,
    stopType:String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

module.exports = mongoose.model('Stop', StopSchema);