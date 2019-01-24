const merge = require('lodash.merge')

const user = require('./User')
const auth = require('./Auth')
const drink = require('./Drink')
const friend = require('./Follow')

const resolvers = [user, auth, drink, friend]

module.exports = merge(...resolvers)
