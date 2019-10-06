const Stop = require('../models/Stop');

module.exports = {

    async index(req, res){
        const { userid } = req.headers;
        const { date } = req.query;
        const stops = await Stop.find({date: date, user: userid});
        return res.json(stops);
    },
}