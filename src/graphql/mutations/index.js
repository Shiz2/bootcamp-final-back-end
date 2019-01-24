const merge = require('lodash.merge')

const user = require('./User')
const auth = require('./Auth')
const drink = require('./Drink')
const friend = require('./Friend')

const resolvers = [user, auth, drink, friend]

module.exports = merge(...resolvers)
