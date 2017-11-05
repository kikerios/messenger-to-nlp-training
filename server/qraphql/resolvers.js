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

const db = () => {
  if (!rdb)
    throw ('rethinkdb - connection')
  return rdb
}

module.exports = () => ({
  Query: {
    getPages(root) {
      Logger.info('getPages')
      const {r, conn} = db()
      return new Promise((resolve, reject) => {
        r.table('pages').filter({}).run(conn, (err, results) => {
          if (err)
            reject(err)
          else
            resolve(results.toArray())
        })
      })
    },
    getPageById(root, args) {
      Logger.info('getPageById %j', args)
      const {r, conn} = db()
      return new Promise((resolve, reject) => {
        r.table('pages').get(args.id).run(conn, (err, result) => {
          if (err)
            reject(err)
          else
            resolve(result)
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
          if (err)
            reject(err)
          else
            resolve(args)
        })
      })

    }
  }
})

