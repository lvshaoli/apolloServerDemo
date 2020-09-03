const gql = require('graphql-tag')
const globby = require('globby')
const typeDefs = [gql`
scalar JSON
type ClientAddon {
  id: ID!
  url: String!
}
type Progress {
  id: ID!
  status: String
  info: String
  error: String
  # Progress from 0 to 1 (-1 means disabled)
  progress: Float
  args: [String]
}
type SharedData {
  id: ID!
  value: JSON
}
type Locale {
  lang: String!
  strings: JSON!
}

type Query {
  progress (id: ID!): Progress
  cwd: String!
  clientAddons: [ClientAddon]
  sharedData (id: ID!, projectId: ID!): SharedData
  locales: [Locale]
}


`]
// Load types in './schema'
const paths = globby.sync(['./schema/*.js'], { cwd: __dirname, absolute: true })
paths.forEach(file => {
    const { types } = require(file)
    types && typeDefs.push(types)
})
module.exports = typeDefs
