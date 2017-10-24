'use strict'

const handlers = require('../handlers')

const routes = (server) => [
  {
    method: 'GET',
    path: '/',
    config: {
      handler: handlers.package.version
    }
  }
]

module.exports = routes
