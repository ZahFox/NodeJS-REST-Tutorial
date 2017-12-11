const Promise = require('bluebird')
const passport = require('passport')
// Require the adapter so the datastore can be accessed
const getConnection = require('../adapters/mysql')
// Require errors
const errors = require('../lib/errors')
const bcrypt = require('bcryptjs')

const Verify = require('../verify')

// Users controller object contains all methods which are exported and used 
// by the service to process actions
const Users = {

  /**
   * To create a new User record
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  register: (req) => {
    return Promise.using(getConnection(), (connection) => {
      const username = connection.escape(req.body.username)
      const salt = bcrypt.genSaltSync(10)
      const password = bcrypt.hashSync(connection.escape(req.body.password), salt)
      const qstr = 'INSERT INTO `user` (`username`, `password`)' +
                   " VALUES ("+username+", '"+password+"')"
      return connection.query(qstr)
      .then( ({ affectedRows, insertId }) => {
        return { affectedRows, insertId }
      })
      .catch(errors.validation)
    })
  },


  /**
   * To verify a User login attempt
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  login: (req, res, next) => {
    // First, validate the login credentials
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return next(err)
      }
      if (!user) {
        return res.status(401).json({
          error: (info ? info.message : 'Invalid Credentials')
        })
      }
      // If the login is successful, create a token and send it back
      const token = Verify.getToken({'id': user.id, 'username': user.name})
      res.status(200).json({
        status: 'Login Successful!',
        success: true,
        token: token
      })
    })(req, res, next)
  },


  /**
   * To check if a token is valid or not
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  validateToken: (req) => {
    return new Promise( (resolve) => {
      resolve({valid: true})
    })
  },
  
}

module.exports = Users