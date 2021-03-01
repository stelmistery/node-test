const express = require('express');
const controllers = require('../controllers/fileapiControllers');
const fileApiRouter = express.Router();
const jsonParser = express.json();


fileApiRouter.get('/write', jsonParser, controllers.wite_file);
fileApiRouter.get('/search', jsonParser, controllers.search);

module.exports = fileApiRouter;