const merge = require('lodash.merge')

const user = require('./User')
const auth = require('./Auth')

const resolvers = [user, auth]

module.exports = merge(...resolvers)
