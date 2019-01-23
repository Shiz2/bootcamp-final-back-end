const Drink = require('../../../models/Drink')
const { TimeStamp } = require('../../CustomScalars/timestamp_scalar')
const { st, knex } = require('../../../../knex-postgis')

const DrinkResolver = async (obj, args, context) => {
  // resolver which returns a Drink given its id.
  try {
    // check if user is logged in
    if (!context.user) {
      throw new Error(
        'User is not logged in or session has expired, please login',
      )
    }
    const { id } = args
    const drink = await Drink.query()
      .findById(id)
      .limit(1)

    if (!drink) {
      throw new Error('Invalid drink ID provided')
    }

    return {
      success: true,
      drink,
    }
  } catch (error) {
    return {
      error: { message: error.message },
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
    const queryBuilder = knex('drinks')
      .select('id', st.asText('coordinates'), 'type', 'createdAt')
      .as('coordinates')

    if (type) {
      queryBuilder.where('type', type)
    }
    if (date) {
      queryBuilder.where('createdAt', '>=', date)
    }

    let usMinLong
    let usMinLat
    let usMaxLong
    let usMaxLat
    if (location) {
      const { minLong, minLat, maxLong, maxLat } = location
      usMinLong = minLong - 1
      usMinLat = minLat - 1
      usMaxLong = maxLong + 1
      usMaxLat = maxLat + 1
    }
    if (!location) {
      usMinLong = -125.0011
      usMinLat = 24.9493
      usMaxLong = -66.9326
      usMaxLat = 49.5904

      // usMinLong = -37.199992
      // usMinLat = -7.504089
      // usMaxLong = 45.199992
      // usMaxLat = 79.504089
    }

    const query = queryBuilder.whereRaw(
      `drinks.coordinates &&  ST_MakeEnvelope(${usMinLong}, ${usMinLat}, ${usMaxLong}, ${usMaxLat}, 4326)`,
    )

    const drinks = await query.orderBy('createdAt')
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
  TimeStamp,
  Query: {
    drink: DrinkResolver,
    drinks: DrinksResolver,
  },
}

module.exports = resolver
