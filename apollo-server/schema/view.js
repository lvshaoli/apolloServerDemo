const gql = require('graphql-tag')


exports.types = gql`
enum ViewBadgeType {
  info
  success
  warning
  error
  accent
  dim
}
`

exports.resolvers = {
  Query: {
  }
}
