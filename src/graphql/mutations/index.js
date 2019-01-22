const merge = require('lodash.merge')

const user = require('./User')
const auth = require('./Auth')
// const post = require('./post')
// const friend = require('./friend')

const resolvers = [user, auth]

module.exports = merge(...resolvers)
