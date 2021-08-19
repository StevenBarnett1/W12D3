const jwt = require("jsonwebtoken");
const { jwtConfig } = require("./config");
const {User} = require('./db/models')
const bearerToken = require("express-bearer-token");

const { secret, expiresIn } = jwtConfig;

const getUserToken = (user) => {
    console.log("begin getUserToken")
  // Don't store the user's hashed password
  // in the token data.
  const userDataForToken = {
    id: user.id,
    email: user.email,
  };

  // Create the token.
  const token = jwt.sign(
    { data: userDataForToken },
    secret,
    { expiresIn: parseInt(expiresIn, 10) } // 604,800 seconds = 1 week
  );

  return token;
};

const restoreUser = async (req, res, next) => {
    console.log("begin restore")
    const { token } = req;

    if (!token) {
      return res.set("WWW-Authenticate", "Bearer").status(401).end();
    }
    console.log("1")
    return jwt.verify(token, secret, null, async (err, jwtPayload) => {
      if (err) {
        err.status = 401;
        return next(err);
      }
      console.log("2")
      const { id } = jwtPayload.data;

      try {
        req.user = await User.findByPk(id);
      } catch (e) {
        return next(e);
      }
      console.log("3",req.user)
      if (!req.user) {
        return res.set("WWW-Authenticate", "Bearer").status(401).end();
      }

      return next();
    });
};

const requireAuth = [bearerToken(), restoreUser];
module.exports = { getUserToken, requireAuth };
