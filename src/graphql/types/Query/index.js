const merge = require('lodash.merge')

const user = require('./user')
const drink = require('./drink')

const resolvers = [user, drink]

module.exports = merge(...resolvers)
