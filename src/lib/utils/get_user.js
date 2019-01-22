const { decodeToken } = require('../tokens')
const knex = require('knex')

/**
 *
 * @param {string} token - typically the token through request headers
 * @param {object} user - user info from database
 */
const getUser = async token => {
  try {
    // if (token) {
    //   try{
    //     return await decodeToken(token);
    //   }catch(error) {
    //     console.error(error)
    //     throw new Error('Your session expired. Sign in again.');
    //   }
    // }

    const { id } = await decodeToken(token)
    const user = await knex('user')
      .select('id')
      .where('id', id)
      .limit(1)
      .then(rows => rows[0])

    if (!user) {
      throw new Error('invalid token')
    }

    return user
  } catch (error) {
    console.error(error)
    return error
  }
}

exports.getUser = getUser
