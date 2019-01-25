const Drink = require('../../../models/Drink')
const Friend = require('../../../models/Friend')
const { st, knex } = require('../../../../knex-postgis')
const moment = require('moment')

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
      .select(
        'id',
        st.x('coordinates').as('long'),
        st.y('coordinates').as('lat'),
        'type',
        'createdAt',
      )
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

    const { input = {} } = args
    const { location, type, date, group } = input
    const queryBuilder = knex('drinks').select(
      'id',
      st.x('coordinates').as('long'),
      st.y('coordinates').as('lat'),
      'type',
      'createdAt',
    )

    if (type && type !== 'ALL') {
      queryBuilder.where('type', type)
    }

    if (group) {
      // add new filter by type of users
      if (group === 'ME') {
        queryBuilder.where('userId', context.user.id)
      } else if (group === 'FRIENDS') {
        const friendsObjs = await Friend.query()
          .select('following')
          .where('follower', context.user.id)
        const friendsIds = friendsObjs.map(friend => friend.following)
        queryBuilder.whereIn('userId', friendsIds)
      }
    }

    if (date) {
      let current = moment()

      if (date === 'HOUR') {
        current = current
          .subtract(3600, 'seconds')
          .toDate()
          .toISOString()
      } else if (date === 'DAY') {
        current = moment()
          .subtract(1, 'days')
          .toDate()
          .toISOString()
      } else if (date === 'WEEK') {
        current = moment()
          .subtract(7, 'days')
          .toDate()
          .toISOString()
      } else if (date === 'MONTH') {
        current = moment()
          .subtract(1, 'months')
          .toDate()
          .toISOString()
      } else if (date === 'YEAR') {
        current = moment()
          .subtract(1, 'years')
          .toDate()
          .toISOString()
      } else {
        current = moment()
          .subtract(10, 'days')
          .toDate()
          .toISOString()
      }

      queryBuilder.where('createdAt', '>=', current)
    }

    let usMinLong
    let usMinLat
    let usMaxLong
    let usMaxLat
    if (location) {
      const { long, lat } = location
      const radius = 5000 // in kilometers
      queryBuilder.whereRaw(
        `ST_DWithin(coordinates::geography, ST_SetSRID(ST_MakePoint(${long},${lat}),4326)::geography, ${radius})`,
      )
    }
    if (!location) {
      usMinLong = -125.0011
      usMinLat = 24.9493
      usMaxLong = -66.9326
      usMaxLat = 49.5904
      queryBuilder.whereRaw(
        `drinks.coordinates &&  ST_MakeEnvelope(${usMinLong}, ${usMinLat}, ${usMaxLong}, ${usMaxLat}, 4326)`,
      )
    }

    const query = queryBuilder

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
  Query: {
    drink: DrinkResolver,
    drinks: DrinksResolver,
  },
}

module.exports = resolver
