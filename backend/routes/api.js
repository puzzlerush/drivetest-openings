var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/apiController');

/* GET home page. */
router.get('/data', api_controller.data);

module.exports = router;