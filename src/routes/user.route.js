const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/token.middleware');
// const permissions = require('../middlewares/roles.middleware');

const router = express.Router();


router.post('/auth/create-user', verifyToken.verify, userController.createUser);
router.post('/auth/signin', userController.signIn);

module.exports = router;
