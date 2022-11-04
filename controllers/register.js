const { createSession } = require('../controllers/signin');

const handleRegister = (req, res, db, bcrypt) => {
  const { email, name, password } = req.body;
  console.log(req.body);
  if (!email || !name || !password) {
    return res.status(400).json('incorrect form submission');
  }
  const hash = bcrypt.hashSync(password);
  db.transaction((trx) => {
    trx
      .insert({
        hash: hash,
        email: email,
      })
      .into('login')
      .returning('email')
      .then((loginEmail) => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0].email,
            name: name,
            joined: new Date(),
          })
          .then((user) => user[0])
          .then((data) => {
            return data.id && data.email
              ? createSession(data)
              : Promise.reject(data);
          })
          .then((session) => res.json(session));
      })
      .then(trx.commit)
      .catch(trx.rollback);
  }).catch((err) => res.status(400).json('unable to register'));
};

module.exports = {
  handleRegister: handleRegister,
};
