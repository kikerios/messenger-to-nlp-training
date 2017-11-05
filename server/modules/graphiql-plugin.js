'use strict'

const { graphiqlHapi } = require('apollo-server')

module.exports = {
  register: graphiqlHapi,
  options: {
    path: '/graphiql',
    graphiqlOptions: {
      endpointURL: '/graphql'
    }
  }
}
