const typeDefs = require('./typeDefs')
const { makeExecutableSchema } = require('graphql-tools')
const merge = require('lodash.merge')

const mutations = require('./mutations')
const types = require('./types')

const protoResolvers = [mutations, types]

const resolvers = merge(...protoResolvers)

const schema = makeExecutableSchema({ typeDefs, resolvers })

module.exports = schema
