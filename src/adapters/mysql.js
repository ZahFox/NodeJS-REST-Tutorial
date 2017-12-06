const mysql = require('promise-mysql')
const config = require('../config')

pool = mysql.createPool({
  host           : config.dbhost,
  user           : config.dbuser,
  password       : config.dbpass,
  database       : config.dbname,
  connectionLimit: config.connectionLimit
})

function getConnection () {
  return pool.getConnection().disposer(connection => {
      pool.releaseConnection(connection)
  })
}

module.exports = getConnection