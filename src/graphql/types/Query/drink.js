const { Drink } = require('../../../models/Drink')

const DrinkResolver = async (obj, args, context) => {
  // resolver which returns a Drink given its id.
  try {
    // check if user is logged in
    if (!context.user) {
      throw new Error('User is not logged in')
    }
    const { id } = args
    const drink = await Drink.query()
      .findById(id)
      .limit(1)

    return {
      success: true,
      drink,
    }
  } catch (error) {
    return {
      error: { error: error.message },
      success: false,
    }
  }
}

const DrinksResolver = async (obj, args, context) => {
  /* resolver which returns a list of all Drinks.
    - this list should be ordered with the most recent Drinks first 
  */
  try {
    // check if user is logged in
    if (!context.user) {
      throw new Error('User is not logged in')
    }
    const { location, type, date } = args
    const queryBuilder = Drink.query()
    if (location) {
      queryBuilder.where('coordinates', location)
    }
    if (type) {
      queryBuilder.where('type', type)
    }
    if (date) {
      queryBuilder.where('createdAt', '>=', date)
    }

    const drinks = queryBuilder.orderBy('created_at')
    return {
      success: true,
      drinks,
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
    drink: DrinkResolver,
    drinks: DrinksResolver,
  },
}

module.exports = resolver
