'use strict'

const config = require('../../config')

const Promise = require('bluebird'),
  Logger = require('bucker').createLogger({
    name: 'resolvers',
    console: config.get('/logger/options/console')
  })

let rdb

const rethinkdbHelper = require('../lib/rethinkdb-helper')().then(rethinkdb => {
  rdb = rethinkdb
})

const db =() => {
  if (!rdb)
    throw ('rethinkdb - connection')
  return rdb
}

module.exports = () => ({
  Query: {
    getPageById(root, { id }) {
      const {r, conn} = db()
      return new Promise((resolve, reject) => {
        r.table('pages').get(id).run(conn, (err, result) => {
          if (err) {
            Logger.error(err)
            reject(err)
          } else {
            Logger.debug('%j', result)
            resolve(result)
          }
        })
      })
    }
  },
  Mutation: {
    createPage(root, args) {
      const {r, conn} = db()
      Logger.info('createPage %j', args)
      return new Promise((resolve, reject) => {
        r.table('pages').get(args.id).replace(args).run(conn, (err, result) => {
          if (err) {
            Logger.error(args, err)
            reject(err)
          } else {
            Logger.debug('%j %j', args, result)
            resolve(args)
          }
        })
      })

    }
  }
})

