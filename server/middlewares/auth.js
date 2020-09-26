//require('dotenv').config();

const jwt = require('jsonwebtoken');

module.exports = {
  verifyToken: (req, res, next) => {
    let token = req.headers['token'];

    jwt.verify(token, process.env.SIGN_TOKEN, (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).json({ ok: false, message: 'Token not valid' });
      }
      // decoded contains var user
      req.user = decoded.user;
      next();
    });
  },
  verifyAdminRole: (req, res, next) => {
    let {
      user: { role },
    } = req;
    console.log(role);
    if (role === 'ADMIN_ROLE') {
      next();
    } else {

        return res.json({
          ok: false,
          message: 'user is not admin',
        });
    }
  },
};
