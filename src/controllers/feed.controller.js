const query = require('../db/index');

const feedController = {
  /**
   * Get GIF posts or articles
   * @param {object} req
   * @param {object} res
   * @returns {object} array of objects
   */
  async getFeed(req, res) {
    const sql1 = ' SELECT * FROM articles;';
    const sql2 = ' SELECT * FROM gifs;';
    const feeds = [];

    try {
      // Get articles
      const {
        rows: articles,
      } = await query(sql1);

      articles.forEach((item) => {
        feeds.push({
          id: item.articleid,
          createdOn: item.createdon,
          title: item.title,
          article: item.message,
          authorId: item.owner,
        });
      });

      // Get gifs
      const {
        rows: gifs,
      } = await query(sql2);

      gifs.forEach((gif) => {
        feeds.push({
          id: gif.gifid,
          createdOn: gif.createdon,
          title: gif.title,
          url: gif.imageurl,
          authorId: gif.owner,
        });
      });

      // Sort feeds
      feeds.sort((a, b) => b.createdon - a.createdon);

      return res.status(200).json({
        status: 'success',
        data: {
          feeds,
        },
      });
    } catch (error) {
      return res.status(403).json({
        error,
      });
    }
  },
};


module.exports = feedController;
