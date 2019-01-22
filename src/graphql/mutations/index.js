const merge = require('lodash.merge')

const user = require('./User')
const post = require('./Drink')

const resolvers = [user, post]

module.exports = merge(...resolvers)
