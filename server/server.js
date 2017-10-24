'use strict'

const config = require('../config')

const Promise = require('bluebird'),
  Hapi = require('hapi'),
  Logger = require('bucker').createLogger({
    name: 'server',
    console: config.get('/logger/options/console')
  })

const plugins = require('./modules/plugins'),
  routes = require('./init/routes')

const start = (host, port) => {
  return new Promise((resolve, reject) => {

    // Create the server
    const server = new Hapi.Server()
    server.connection({ host, port })

    // Register all the plugins
    server.register(plugins, (err) => {

      // catch the error
      if (err) {
        Logger.error(err)
        return reject(err)
      }

      // Initialize routes
      server.route(routes(server))

      // Start accepting requests
      server.start((err) => {
        if (err) {
          Logger.error(err)
          return reject(err)
        }

        // Server started successfully - register routes
        Logger.log(`Server running at: ${server.info.uri}`)
        resolve()
      })

      server.on('request-error', (req, err) => {
        Logger.error(err)
      })
    })
  })
}

module.exports = {
  start
}
