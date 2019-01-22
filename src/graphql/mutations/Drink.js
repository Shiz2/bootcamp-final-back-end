const User = require('../../models/User')
// const Drink = require('../../models/Drink')

const createDrink = async (obj, { content }, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }

  const user = await User.query()
    .where('id', context.user.id)
    .then(res => res[0])

  if (!user) {
    return {
      error: {
        message: 'Logged in user does not exist',
      },
    }
  }

  const drink = await user.$relatedQuery('drinks').insert({ content })

  if (!drink) {
    throw new Error('Could not add post')
  }

  return {
    drink,
  }
}

const resolver = { Mutation: { createDrink } }

module.exports = resolver
