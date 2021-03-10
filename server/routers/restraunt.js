const express = require('express');
const restrauntController = require('../controllers/restraunt');
const router = express.Router();

router.get('/city/:city', restrauntController.getResByCity);
router.get('/id/:id', restrauntController.getResById);
router.post('/filter',restrauntController.getResByFilters);
router.post('/pages',restrauntController.getPagenos);

module.exports = router;