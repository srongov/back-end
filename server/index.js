const { ApolloServer } = require('apollo-server')

const { connectDB } = require('./utils/connectDB')
const resolvers = require('./graphql/resolvers/index')
const typeDefs = require('./graphql/typeDefs')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
})

connectDB()

server.listen({ port: process.env.PORT || 4000 }).then((res) => {
  console.log(`Server is running at ${res.url}`);
})
