const Promise = require('bluebird')
// Require the adapter so the datastore can be accessed
const getConnection = require('../adapters/mysql')
// Require errors
const errors = require('../lib/errors')


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
      let date = connection.escape(req.body.date)
      let dayOfWeek = connection.escape(req.body.day_of_week)
      let  storeLocation = connection.escape(req.body.store_location)
      let hoursWorked = connection.escape(req.body.hours_worked)
      let totalTips = connection.escape(req.body.total_tips)
      let gasMoney = connection.escape(req.body.gas_money)
      let profit = connection.escape(req.body.profit)

        return connection.query(
        `INSERT INTO report (date, day_of_week, store_location, hours_worked, total_tips, gas_money, profit)` +
          `VALUES (${date}, ${dayOfWeek}, ${storeLocation}, ${hoursWorked}, ${totalTips}, ${gasMoney}, ${profit})`)
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
   * To get a specific Report record by its report_id
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  getReportById: (req) => {
    return Promise.using(getConnection(), (connection) => {
      let id = connection.escape(req.params.id)
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
   * To update a specific Report record by its report_id
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  updateReport: (req) => {
    return Promise.using(getConnection(), (connection) => {
      let qStr = 'UPDATE report SET '
      let id = connection.escape(req.params.id)

      // dynamically adjust the query to include all updated fields
      Object.keys(req.body).forEach( (column) => {
        qStr += `${column} = ${connection.escape(req.body[column])}, `
      })
      qStr = qStr.slice(0, qStr.length - 2) +
        ` WHERE report_id = ${id}`

        return connection.query(qStr)
          .then( ({affectedRows, changedRows}) => {
            return {affectedRows, changedRows}
          })
          .catch(errors.validation)
    })
  },

}
  
module.exports = Reports