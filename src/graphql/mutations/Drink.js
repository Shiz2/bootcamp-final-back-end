const User = require('../../models/User')
const { st } = require('../../../knex-postgis')

// const Drink = require('../../models/Drink')

const createDrink = async (obj, { input }, context) => {
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

  const { type, lat, long } = input
  // const { drink } = type
  const newDrink = await user.$relatedQuery('drinks').insert({
    type,
    coordinates: st.geomFromText(`Point(${long} ${lat})`, 4326),
    lat,
    long,
  })

  if (!newDrink) {
    throw new Error('Could not add post')
  }

  return {
    newDrink,
  }
}

const resolver = { Mutation: { createDrink } }

module.exports = resolver
