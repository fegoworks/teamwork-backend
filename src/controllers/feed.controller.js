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

      articles.forEach((article) => {
        feeds.push(article);
      });

      // Get gifs
      const {
        rows: gifs,
      } = await query(sql2);

      gifs.forEach((gif) => {
        feeds.push(gif);
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
