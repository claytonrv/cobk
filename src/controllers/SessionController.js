const User = require('../models/User');

module.exports = {

    async storeSession(req, res) {
        const { email } = req.body;
        let user = await User.findOne({ email });
        if (!user){
            //user = await User.create({ email });
            return res.json({error: "User not found."});
        }
        return res.json(user);
    }
};