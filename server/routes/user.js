exports = module.exports = function (app, mongoose) {
  const { User, LoggedInUser } = app.db.models;
  const { Router } = require('express');
  const router = Router();
  const { SHA256 } = require('crypto-js');
  const jwt = require("jsonwebtoken");


  router.post('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      const hashedPassword = SHA256(JSON.stringify(password) + app.get('passwordSalt')).toString()
      const findedUser = await User.findOne({ email, password: hashedPassword }, { password: 0 });
      if (!findedUser) throw Error('email or passowrd is not correct');
      const tokenData = await saveToken(findedUser);
      res.send({ success: true, data: { ...JSON.parse(JSON.stringify(findedUser)), token: tokenData.token } });
    } catch (err) {
      return res.status(400).send({ success: false, message: err.message })
    }
  })


  const saveToken = async ({ _id, email }) => {
    const token = jwt.sign(
      { _id, email },
      app.get('tokenSecret')
    );
    const loggedInUser = new LoggedInUser({ token, user: _id })
    return loggedInUser.save();
  }

  app.use('/auth', router)
}

