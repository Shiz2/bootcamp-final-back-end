const merge = require('lodash.merge')

const user = require('./User')
const auth = require('./Auth')
const drink = require('./Drink')

const resolvers = [user, auth, drink]

module.exports = merge(...resolvers)
