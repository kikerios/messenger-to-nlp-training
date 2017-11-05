'use strict'

const { apolloHapi } = require('apollo-server')
const { makeExecutableSchema } = require('graphql-tools')

const graphqlSchema = require('../qraphql/schema')
const createResolvers = require('../qraphql/resolvers')

const executableSchema = makeExecutableSchema({
  typeDefs: [graphqlSchema],
  resolvers: createResolvers()
})

module.exports = {
  register: apolloHapi,
  options: {
    path: '/graphql',
    apolloOptions: () => ({
      pretty: true,
      schema: executableSchema
    })
  }
}
