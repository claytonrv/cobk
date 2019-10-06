const crypto = require('crypto');
const User = require('../models/User');

module.exports = {
    async index(req, res){
        const { address } = req.query;
        console.log(address);
        const users = await User.find({email: address});
        return res.json(users);
    },

    async store(req, res){
        const { filename } = req.file;
        const userJson = req.body;
        //console.log(userJson);
        console.log(userJson.email)
        //console.log(req.file);
        let user = await User.findOne({email: userJson.email});
        if(!user){
            userJson.password = crypto.createHash('md5').update(userJson.password).digest('hex');
            userJson.profile_thumb = filename;
            user = await User.create(userJson);
            console.log(user);
            return res.json(user);
        }
    return res.json({message: "User found on database"});
    }
};