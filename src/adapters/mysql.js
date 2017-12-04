const mysql = require('promise-mysql')

pool = mysql.createPool({
  host           : 'localhost',
  user           : 'root',
  password       : '_DivVb76JJesfy54fdghDFs12',
  database       : 'delivery-reporter',
  connectionLimit: 10
})

function getConnection () {
  return pool.getConnection().disposer(connection => {
      pool.releaseConnection(connection)
  })
}

module.exports = getConnection