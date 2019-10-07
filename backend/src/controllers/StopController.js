const Stop = require('../models/Stop');
const dateformat = require('dateformat');

module.exports = {

    async index(req, res){
        const { userid } = req.query;
        const stops = await Stop.find({user: userid});
        return res.json(stops);
    },

    async store(req, res){
        const { userid } = req.headers;
        const { stopType } = req.body; 
        const today = dateformat(new Date(), "yyyy-mm-dd");
        const now = dateformat(new Date(), "hh:MM:ss" );
        const stop = await Stop.create({
            date: today,
            time: now,
            stopType: stopType,
            user: userid
        });

        
        const ownerSocket = req.connectedUsers[userid];

        console.log(req.connectedUsers);
        console.log(userid);

        if(ownerSocket){
            req.io.to(ownerSocket).emit('newStop', stop);
        }

        return res.json(stop);
    }

}