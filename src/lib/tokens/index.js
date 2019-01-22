const jwt = require('jwt-simple')
const config = require('../../../config')

/**
 *
 * @param {string} userId - typically the user's id in database
 * @param {string} token - encoded token with user's id
 */
const createToken = async userId => {
  const jwtPayload = {
    id: userId,
  }
  return jwt.encode(jwtPayload, config.tokenSecret)
}

/**
 *
 * @param {string} token - typically the token sent through request headers
 * @param {object} {id: userId} - originally encoded object
 */
const decodeToken = async token => {
  if (!token) {
    throw new Error(
      'This request or view requires you to be authenticated first. No token provided. Please sign in.',
    )
  }

  let decoded
  try {
    decoded = jwt.decode(token, process.env.TOKEN_SECRET, null, null)
  } catch (error) {
    console.error(error)
    throw new Error(
      'Your session token is invalid or has expired. Please sign in again.',
    )
  }
  if (!decoded.id) {
    console.error('no id in token')
    throw new Error(
      'Your session token is invalid or has expired. Please sign in again.',
    )
  }

  return decoded
}

exports.createToken = createToken
exports.decodeToken = decodeToken
