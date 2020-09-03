const globby = require('globby')
const { GraphQLJSON } = require('graphql-type-json')
const merge = require('lodash.merge')
resolvers = [
    {
        JSON: GraphQLJSON,
        ClientAddon: {
            url: (addon, args, context) => ''
        },
        Query: {
            cwd: () => 'cwd',
        }
    }
]



// Load resolvers in './schema'
const paths = globby.sync(['./schema/*.js'], { cwd: __dirname, absolute: true })
paths.forEach(file => {
    const { resolvers: r } = require(file)
    r && resolvers.push(r)
})

module.exports = merge.apply(null, resolvers)
