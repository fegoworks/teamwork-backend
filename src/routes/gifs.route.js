const express = require('express');
const gifController = require('../controllers/gifs.controller');
const verifyToken = require('../middlewares/token.middleware');
const upload = require('../middlewares/multer');
const validate = require('../middlewares/helpers/validate');

const router = express.Router();

router.post('/gifs',
  verifyToken.verify,
  upload.single('image'),
  validate.validateBody(validate.schemas.createGifSchema),
  gifController.createGif);

router.get('/gifs/:gifId',
  verifyToken.verify,
  validate.validateParams(validate.schemas.gifIdSchema),
  gifController.getGif);

router.delete('/gifs/:gifId',
  verifyToken.verify,
  validate.validateParams(validate.schemas.gifIdSchema),
  gifController.deleteGif);

module.exports = router;