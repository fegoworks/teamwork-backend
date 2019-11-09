const permissions = {
  adminOnly(req, res, next) {
    if (req.usertype === 'admin') {
      if (req.params.email === req.email) {
        return next();
      }
      return res.json({
        status: 403,
        error: 'Unauthorized Access',
      });
    }
    return next();
  },
};

module.exports = permissions;
