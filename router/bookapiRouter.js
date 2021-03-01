const controllers = require('../controllers/bookapiController');
const express = require("express");
const bookApiRouter = express.Router();
const jsonParser = express.json();


bookApiRouter.get('/all', controllers.bookall);
bookApiRouter.get('/get_by', jsonParser, controllers.get_by);
bookApiRouter.get('/:id', controllers.get_one);
bookApiRouter.post('/create', jsonParser, controllers.create);
bookApiRouter.put('/update/:id', jsonParser, controllers.update_one)
bookApiRouter.delete('/delete/:id', controllers.delete_one);

module.exports = bookApiRouter;