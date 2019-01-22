const User = require('../../../models/User')

const userResolver = async (obj, args, context) => {
  // TODO: Write a resolver which returns a user given a user id.
  // if (!context.user) throw new Error('User not logged in')
  const user = await User.query().where('email', 'like', `${args.email}`)
  return user
}

const resolver = {
  Query: {
    user: userResolver,
  },
}

module.exports = resolver
