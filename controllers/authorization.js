const redisClient = require('./signin').redisClient;

const requireAuth = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json('Unauthorized');
  }
  try {
    const id = await redisClient.get(authorization);
    if (!id) {
      return res.status(401).json('Unauthorized');
    }
    return next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  requireAuth,
};
