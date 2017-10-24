'use strict'

const config = require('../../config')

const version = (request, reply) => {
  reply({ version: config.get('/version') })
}

module.exports = {
  version
}
