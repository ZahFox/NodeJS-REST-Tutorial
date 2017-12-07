const jwt = require('jsonwebtoken')
const config = require('./config')

exports.getToken = (user) => {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  })
}

exports.verifyUser = (req, res, next) => {
  // Check header or URL parameters or POST parameters for token
  const token = req.headers['x-access-token'] || req.body.token || req.query.token 

  // Decode the token
  if (token) {
    // Verify Secret and Check Expiration Date
    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) {
          return res.status(401).json({
              error: 'Unauthorized Access!'
          })
      } else {
          // If everything is good, save to the request
          req.decoded = decoded
          next()
        }
      })
  } else {
    // If there is no token, retun an error
    return res.status(403).json({
      error: 'Token is Required for Authorized Access!'
    })
  }
}