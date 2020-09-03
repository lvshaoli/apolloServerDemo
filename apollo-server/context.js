
const cwd = require('./connectors/cwd')
module.exports = ({ req } = {}) => {
    return {
        cwd: cwd.get()
    }
}
