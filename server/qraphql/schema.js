'use strict'

const schema = `
  input inputPage {
    id: ID!
    name: String!
    token: String!
  }
  type Success {
    success: Boolean
  }
  type Page {
    id: ID!
    name: String!
    token: String!
  }
  type Query {
    getPages: [Page],
    getPageById(id: ID!): Page
  }
  type Mutation {
    createPage(id: ID!, name: String! token: String!): Page,
    createPages(pages: [inputPage]): [Page],
    deletePageById(id: ID!): Success
  }
  schema {
    query: Query
    mutation: Mutation
  }
`

module.exports = schema
