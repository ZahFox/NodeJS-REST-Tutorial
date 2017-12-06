const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const _ = require('lodash')

const config = require('./config')

// for testing only //
const users = [
  {
    id: 1,
    name: 'test',
    password: 'password'
  },
  {
    id: 2,
    name: 'test2',
    password: 'password'
  }
]
// for testing only //


exports.local = passport.use(new LocalStrategy(
  (username, password, next) => {
    // usually this would be a databse call":
    const user = users[_.findIndex(users, {name: username})]

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
  }
))