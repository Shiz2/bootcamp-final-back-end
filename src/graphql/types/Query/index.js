const merge = require('lodash.merge')

const user = require('./user')
const drink = require('./drink')
const number = require('./number')
const friend = require('./friend')

const resolvers = [user, drink, number, friend]

module.exports = merge(...resolvers)
