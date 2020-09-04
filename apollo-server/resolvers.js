const globby = require('globby')
const { GraphQLJSON } = require('graphql-type-json')
const merge = require('lodash.merge')
// Connectors
const cwd = require('./connectors/cwd')
const progress = require('./connectors/progress')
const clientAddons = require('./connectors/client-addons')
const sharedData = require('./connectors/shared-data')
const locales = require('./connectors/locales')
resolvers = [
    {
        JSON: GraphQLJSON,
        DescribedEntity: {
            __resolveType (obj, context, info) {
                return null
            }
        },
        ClientAddon: {
            url: (addon, args, context) => clientAddons.getUrl(addon, context)
        },
        Query: {
            cwd: () => cwd.get(),
            progress: (root, {id}, context) => progress.get(id, context),
            clientAddons: (root, args, context) => clientAddons.list(context),
            sharedData: (root, args, context) => sharedData.get(args, context),
            locales: (root, args, context) => locales.list(context)
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
