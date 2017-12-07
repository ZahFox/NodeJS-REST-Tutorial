const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const Promise = require('bluebird')
// Require the adapter so the datastore can be accessed
const getConnection = require('./adapters/mysql')
const bcrypt = require('bcryptjs')

const config = require('./config')

exports.local = passport.use(new LocalStrategy(
  (username, password, next) => {
    Promise.using(getConnection(), (connection) => {
      username = connection.escape(username)
      console.log(username)
      // First, query the database and search for a User with the provided username
      return connection.query(`SELECT * FROM user WHERE username = ${username}`)
        .then( (rows) => {
          // If the User is found, compare the provided password with the hash
          if (typeof rows != 'undefined' && rows != null && rows.length === 1) {
            bcrypt.compare(connection.escape(password), rows[0].password, (err, res) => {
              if (res) {
                return next(null, rows[0])
              }
              return next(null, false)
            })  
          } else {
            return next(null, false)
          }
        })
        .catch(() => {return next(null, false)})
    })
  }
))