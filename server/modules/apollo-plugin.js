'use strict'

const { apolloHapi } = require('apollo-server'),
  { makeExecutableSchema } = require('graphql-tools'),
  graphqlSchema = require('../qraphql/schema'),
  createResolvers = require('../qraphql/resolvers'),
  executableSchema = makeExecutableSchema({
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
