const { redisClient } = require('./signin');

const signoutUser = async (req, res) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json('Unauthorized');
  }
  try {
    await redisClient.del(authorization);
    res.send('Deleted');
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  signoutUser,
};
