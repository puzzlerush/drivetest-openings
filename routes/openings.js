var express = require('express');
var router = express.Router();

var opening_controller = require('../controllers/openingController');

router.get('/select', opening_controller.select_openings_get);

router.post('/select', opening_controller.select_openings_post);

router.get('/all', opening_controller.all_openings);

module.exports = router;