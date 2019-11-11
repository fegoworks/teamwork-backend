const express = require('express');
const gifController = require('../controllers/gifs.controller');
const verifyToken = require('../middlewares/token.middleware');
const upload = require('../middlewares/multer');

const router = express.Router();

router.post('/gifs', verifyToken.verify, upload.single('image'), gifController.createGif);
router.delete('/gifs/:gifid', verifyToken.verify, gifController.deleteGif);

module.exports = router;
