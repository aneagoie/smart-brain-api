const jwt = require('jsonwebtoken');
const redis = require('redis');

// redis connection
const redisClient = redis.createClient({
  url: process.env.REDIS_URI,
});

async function redisConnect() {
  return await redisClient.connect();
}
redisConnect();

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db
    .select('email', 'hash')
    .from('login')
    .where('email', '=', email)
    .then((data) => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db
          .select('*')
          .from('users')
          .where('email', '=', email)
          .then((user) => user[0])
          .catch((err) => Promise.reject('unable to get user'));
      } else {
        Promise.reject('unable to get user');
      }
    })
    .catch((err) => Promise.reject('unable to get user'));
};

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;
  return redisClient.get(authorization, (err, reply) => {
    if (err || !reply) {
      return res.status(400).json('Unauthorized');
    }
    return res.json({ id: reply });
  });
};

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.JWT_SECRET, { expiresIn: '2d' });
};

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  return setToken(token, id)
    .then(() => {
      return { success: 'true', userId: id, token, user };
    })
    .catch(console.log);
};

const signinAuthentication = (db, brcypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId(req, res)
    : handleSignin(db, brcypt, req, res)
        .then((data) => {
          return data.id && data.email
            ? createSession(data)
            : Promise.reject(data);
        })
        .then((session) => res.json(session))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  signinAuthentication,
};
