const Drink = require('../../../models/Drink')

const NumberResolver = async (obj, args, context) => {
  // resolver which returns a Drink given its id.
  try {
    // check if user is logged in
    if (!context.user) {
      throw new Error('User is not logged in')
    }

    const { user } = context

    const friend = await user.$relatedQuery('friends')

    return {
      success: true,
      friend,
    }
  } catch (error) {
    return {
      error: { message: error.message },
      success: false,
    }
  }
}

const resolver = {
  Query: {
    number: NumberResolver,
  },
}

module.exports = resolver
