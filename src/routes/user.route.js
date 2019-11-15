const express = require('express');
const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/token.middleware');
const validate = require('../middlewares/helpers/validate');
const permissions = require('../middlewares/roles.middleware');

const router = express.Router();


router.post('/auth/create-user',
  verifyToken.verify,
  permissions.adminOnly,
  validate.validateBody(validate.schemas.authSchema),
  userController.createUser);

router.post('/auth/signin',
  validate.validateBody(validate.schemas.authLoginSchema),
  userController.signIn);

module.exports = router;