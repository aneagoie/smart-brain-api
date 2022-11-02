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

const getAuthTokenId = () => {
  console.log('auth ok');
};

const signinAuthentication = (db, brcypt) => (req, res) => {
  const { authorization } = req.headers;
  return authorization
    ? getAuthTokenId()
    : handleSignin(db, brcypt, req, res)
        .then((data) => res.json(data))
        .catch((err) => res.status(400).json(err));
};

module.exports = {
  signinAuthentication,
};
