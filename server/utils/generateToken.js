const jwt = require('jsonwebtoken')

module.exports = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username
    },
    'abc1234',
    { expiresIn: '3h' }
  )
}
