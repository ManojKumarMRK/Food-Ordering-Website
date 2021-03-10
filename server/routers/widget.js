const express = require('express');
const widgetController = require('../controllers/widget');
const router = express.Router();

router.get('/widget', widgetController.getWidget);
router.get('/cities', widgetController.getCities);


module.exports = router;