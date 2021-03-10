const express = require('express');
const userController = require('../controllers/users');
const checkAuth = require('../middleware/checkauth');
const router = express.Router();

router.post('/users' , userController.signup);
router.post('/login' , userController.login);
router.post('/clear' , userController.clear);//only for development purpose
router.use(checkAuth);//authentication middleware
router.get('/logout', userController.logout);
router.post('/order',userController.order);

module.exports = router;