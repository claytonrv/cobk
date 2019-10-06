const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload')
const SessionController = require('./controllers/SessionController');
const UserController = require('./controllers/UserController');
const StopController = require('./controllers/StopController');
const DashboardController = require('./controllers/DashboardController');

const routes = express.Router();
const upload = multer(uploadConfig)
//req.query => Acessar query params (filtros Get)
//req.params => Acessar route params (Put/Post)

routes.put('/update_user/:id', (req, res) => {
    return res.json({user:req.params.id});
});

routes.post('/add_user', upload.single('profile_thumb'), UserController.store);

routes.get('/get_user', UserController.index);

routes.post('/add_session', SessionController.storeSession);

routes.get('/user_stops', StopController.index);

routes.post('/add_stop', StopController.store);

routes.get('/dashboard', DashboardController.index);

routes.delete('/delete_user', (req, res) =>{
    return res.json({user:req.params.id});
});

module.exports = routes;