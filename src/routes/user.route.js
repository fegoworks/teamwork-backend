const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/token.middleware');
// const permissions = require('../middlewares/roles.middleware');

const router = express.Router();


router.post('/create-user', verifyToken.verify, userController.createUser);
router.post('/signin', userController.signIn);

module.exports = router;
