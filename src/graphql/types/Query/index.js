const merge = require('lodash.merge')

const user = require('./user')
const drink = require('./drink')
const number = require('./number')

const resolvers = [user, drink, number]

module.exports = merge(...resolvers)
