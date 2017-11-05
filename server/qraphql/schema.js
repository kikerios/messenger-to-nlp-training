'use strict'

const schema = `
  type Page {
    id: ID!
    name: String!
    token: String!
  }
  type Query {
    getPageById(id: ID!): Page
  }
  type Mutation {
    createPage(id: ID!, name: String! token: String!): Page
  }
  schema {
    query: Query
    mutation: Mutation
  }
`

module.exports = schema
