const permissions = {
  adminOnly(req, res, next) {
    if (req.userType === 'admin') {
      return next();
    }
    return res.json({
      status: 403,
      error: 'Unauthorized Access',
    });
  },
};

module.exports = permissions;
