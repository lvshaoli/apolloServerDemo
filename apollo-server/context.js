
const cwd = require('./connectors/cwd')
const db = require('./util/db')
const pubsub = require('./pubsub')
module.exports = ({ req } = {}) => {
    return {
        db,
        pubsub,
        cwd: cwd.get()
    }
}
