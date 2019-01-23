const { decodeToken } = require('../tokens')
const User = require('../../models/User.js')

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
    const user = await User.query()
      .findById(id)
      .limit(1)

    if (!user) {
      throw new Error('invalid token')
    }

    return user
  } catch (error) {
    console.error(error)
    return ''
  }
}

exports.getUser = getUser
