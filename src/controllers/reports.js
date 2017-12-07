const Promise = require('bluebird')
// Require the adapter so the datastore can be accessed
const getConnection = require('../adapters/mysql')
// Require errors
const errors = require('../lib/errors')
const bcrypt = require('bcryptjs')


// Reports controller object contains all methods which are exported and used 
// by the service to process actions
const Reports = {

  /**
   * To create a new Report record
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  createReport: (req) => {
    return Promise.using(getConnection(), (connection) => {
      const date = connection.escape(req.body.date)
      const dayOfWeek = connection.escape(req.body.day_of_week)
      const storeLocation = connection.escape(req.body.store_location)
      const hoursWorked = connection.escape(req.body.hours_worked)
      const totalTips = connection.escape(req.body.total_tips)
      const gasMoney = connection.escape(req.body.gas_money)
      const profit = connection.escape(req.body.profit)

      return connection.query(
      `INSERT INTO report (date, day_of_week, store_location, hours_worked, total_tips, gas_money, profit)
         VALUES (${date}, ${dayOfWeek}, ${storeLocation}, ${hoursWorked}, ${totalTips}, ${gasMoney}, ${profit})`)
        .then( ({ affectedRows, insertId }) => {
          return { affectedRows, insertId }
        })
        .catch(errors.validation)
    })
  },


  /**
   * To get all Report records
   * @returns {Promise.<Array>}
   */
  getAllReports: () => {
    return Promise.using(getConnection(), (connection) => {
      return connection.query('SELECT * FROM report')
        .then( (rows) => {
          return rows
        })
        .catch(errors.validation)
    })
  },


  /**
   * To get a Report record using its report_id
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  getReportById: (req) => {
    return Promise.using(getConnection(), (connection) => {
      const id = connection.escape(req.params.id)
      return connection.query(`SELECT * FROM report WHERE report_id = ${id}`)
        .then( (rows) => {
          if (typeof rows != 'undefined' && rows != null && rows.length === 1) {
            return rows[0]
          } else {
            errors.validation(`no report was found with the id: ${id}`)
          }
        })
        .catch(errors.validation)
    })
  },


  /**
   * To update a Report record using its report_id
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  updateReport: (req) => {
    return Promise.using(getConnection(), (connection) => {
      let qStr = 'UPDATE report SET '
      const id = connection.escape(req.params.id)
      let count = 0
      // dynamically adjust the query to include all updated fields
      Object.keys(req.body).forEach( (column) => {
        if (column !== 'report_id') {
          qStr += `${column} = ${connection.escape(req.body[column])}, `
          count++
        }
      })
      qStr = qStr.slice(0, qStr.length - 2) +
        ` WHERE report_id = ${id}`
      if (count > 0) {
        return connection.query(qStr)
        .then( ({ affectedRows, changedRows }) => {
          return {affectedRows, changedRows}
        })
        .catch(errors.validation)
      } else {
        errors.validation('atleast one must column must be updated')
      }

    })
  },


  /**
   * To delete a Report record using its report_id
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  deleteReport: (req) => {
    return Promise.using(getConnection(), (connection) => {
      const id = connection.escape(req.params.id)
      return connection.query(
        `DELETE FROM report WHERE report_id = ${id}`
      )
      .then( ({ affectedRows }) => {
        return {affectedRows}
      })
      .catch(errors.validation)
    })
  }
}
  
module.exports = Reports