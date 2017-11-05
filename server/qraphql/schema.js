'use strict'

const schema = `
  input inputPage {
    id: ID!
    name: String!
    token: String!
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
    createPages(pages: [inputPage]): [Page]
  }
  schema {
    query: Query
    mutation: Mutation
  }
`

module.exports = schema
