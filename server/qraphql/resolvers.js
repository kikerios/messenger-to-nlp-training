'use strict'

// demo
const pages = [
  {
    id: '260408104412145',
    name: 'Hubot Messenger Bot',
    token: '***'
  }
]

const resolvers = () => ({
  Query: {
    getPageById(root, { id }) {
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].id == id) {
          return pages[i]
        }
      }
    }
  },
  Mutation: {
    createPage(root, args) {
      pages.push(args)
      return args
    }
  }
})

module.exports = resolvers
