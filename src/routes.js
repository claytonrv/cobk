const express = require("express");
const SessionController = require('./controllers/SessionController');

const routes = express.Router();

//req.query => Acessar query params (filtros Get)
//req.params => Acessar route params (Put/Post)

routes.get('/get_user', (req, res)=>{
    return res.json({user: req.query.id});
});

routes.put('/update_user/:id', (req, res) => {
    return res.json({user:req.params.id});
});

routes.post('/add_user', SessionController.store);

routes.delete('/delete_user', (req, res) =>{
    return res.json({user:req.params.id});
});

module.exports = routes;