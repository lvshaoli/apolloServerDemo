const globby = require('globby')
const { GraphQLJSON } = require('graphql-type-json')
const merge = require('lodash.merge')
// Connectors
const cwd = require('./connectors/cwd')
resolvers = [
    {
        JSON: GraphQLJSON,
        DescribedEntity: {
            __resolveType (obj, context, info) {
                return null
            }
        },
        ClientAddon: {
            url: (addon, args, context) => ''
        },
        Query: {
            cwd: () => cwd.get(),
            progress: (root, { id }, context) => {
                return {
                    status: '1',
                    info: '2',
                    error: '33',
                    progress: '0.1',
                    args: ['2']
                }
            }
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
