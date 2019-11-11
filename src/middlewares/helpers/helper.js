const query = require('../../db/index');

const getRows = async (text) => {
  try {
    const {
      rows,
      rowCount,
    } = await query(text);

    if (rowCount < 1) {
      return {
        error: 'Not found',
      };
    }
    return rows[0];
  } catch (error) {
    return {
      status: 'Request failed',
      error,
    };
  }
};

module.exports = getRows;
