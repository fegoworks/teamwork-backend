const fs = require('fs');
const Gif = require('../models/gifs.model');
const query = require('../db/index');
const userController = require('../controllers/user.controller');
const cloudinary = require('../config/cloudinary');

const gifController = {
  async createGif(req, res) {
    const user = await userController.getAUser(req.id);
    let newGif = new Gif();
    newGif = {
      ...req.body,
    };

    const {
      userid,
    } = user;
    newGif.owner = userid;

    // Get cloudinary details
    const url = await cloudLink(req.file);
    newGif.imageUrl = url.url;

    try {
      const text = `INSERT INTO
        gifs(title, imageurl, owner)
        VALUES($1, $2, $3)
        returning *`;

      const values = [
        newGif.title,
        newGif.imageUrl,
        newGif.owner,
      ];

      const {
        rows,
      } = await query(text, values);

      res.status(200).json({
        message: 'GIF image successfully posted',
        data: {
          gifId: rows[0].gifid,
          createdOn: rows[0].createdon,
          title: rows[0].title,
          imageUrl: rows[0].imageurl,
        },
      });
    } catch (error) {
      res.status(403).json({
        error,
      });
    }
  },
};

const cloudLink = async (file) => {
  try {
    // Upload file to cloudinary
    const uploader = async (path) => cloudinary.uploads(path, 'Images');
    const {
      path,
    } = file;
    const url = await uploader(path);
    fs.unlinkSync(path);

    return url;
  } catch (error) {
    return {
      status: 'Request failed',
      error,
    };
  }
};

module.exports = gifController;
