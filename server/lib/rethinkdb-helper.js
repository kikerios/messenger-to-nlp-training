'use strict'

const config = require('../../config')

const Promise = require('bluebird'),
  Logger = require('bucker').createLogger({
    name: 'rethinkdb-helper',
    console: config.get('/logger/options/console')
  })

const r = require('rethinkdb'),
  rethinkdbInit = require('rethinkdb-init')(r)

module.exports = () => {
  return new Promise((resolve, reject) => {
    r.init({
      host: config.get('/rethinkdb/host'),
      db: config.get('/rethinkdb/dbname')
    },
      config.get('/rethinkdb/tables')
    ).then(conn => {
      Logger.info('All tables and indexes have been created')
      resolve({ r, conn })
    }).catch(err => {
      Logger.info('Error to create tables')
      reject(err)
    })
  })
}
