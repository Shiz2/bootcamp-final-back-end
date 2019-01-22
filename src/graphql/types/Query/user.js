const User = require('../../../models/User')

const userResolver = async (obj, { id }, context) => {
  try {
    // check if user is logged in
    if (!context.user) {
      throw new Error('User is not logged in')
    }
    const user = await User.query().findById(id)
    return {
      success: true,
      user,
    }
  } catch (error) {
    return {
      success: false,
      error: { message: error.message },
    }
  }
// const userResolver = async (obj, args, context) => {
//   // TODO: Write a resolver which returns a user given a user id.
//   // if (!context.user) throw new Error('User not logged in')
//   const user = await User.query().where('email', 'like', `${args.email}`)
//   return user
}

const resolver = {
  Query: {
    user: userResolver,
  },
  User: {
    drinks: async user => user.relatedQuery('drinks'),
  },
}

module.exports = resolver
