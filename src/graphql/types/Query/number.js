const Drink = require('../../../models/Drink')
const moment = require('moment')

const NumberResolver = async (obj, args, context) => {
  // resolver which returns a Drink given its id.
  try {
    // check if user is logged in
    if (!context.user) {
      throw new Error('User is not logged in')
    }
    const { input = {} } = args
    const { type, time } = input

    let current = moment()

    if (time === 'HOUR') {
      current = current
        .subtract(3600, 'seconds')
        .toDate()
        .toISOString()
    } else if (time === 'DAY') {
      current = moment()
        .subtract(1, 'days')
        .toDate()
        .toISOString()
    } else if (time === 'WEEK') {
      current = moment()
        .subtract(7, 'days')
        .toDate()
        .toISOString()
    } else if (time === 'MONTH') {
      current = moment()
        .subtract(1, 'months')
        .toDate()
        .toISOString()
    } else if (time === 'YEAR') {
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

    const { user } = context

    const drinks = await Drink.query()
      .where('userId', user.id)
      .andWhere('type', type)
      .andWhere('createdAt', '>=', current)

    const number = drinks.length

    return {
      success: true,
      number,
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
