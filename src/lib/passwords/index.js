const bcrypt = require('bcrypt-nodejs')

/**
 *
 * @param {string} plaintextPassword
 * @returns {Promise<string>}
 */
exports.encryptPassword = function(plaintextPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(plaintextPassword, null, null, (err, result) => {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

/**
 *
 * @param {string} plaintextPassword - typically the user entered password
 * @param {string} hash - typically the password that was previously hashed by bcrypt
 * @returns {Promise.<boolean>}
 */
exports.comparePassword = function(plaintextPassword, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(plaintextPassword, hash, (err, matches) => {
      if (err) {
        reject(err)
      } else {
        resolve(matches)
      }
    })
  })
}

/**
 *
 * @param {string} password - typically the user entered password
 * @returns {boolean} - whether or not password is correctly formatted
 */
exports.validatePassword = password => {
  // password must be provided
  if (!password) {
    throw new Error('You need to provide an password.')
  }

  // password must be valid
  if (
    !/^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,}$/.test(password)
  ) {
    throw new Error(
      'Password must have at least eight characters total, one uppercase character, one lowercase character, one digit and one special character.',
    )
  }
  return true
}

/**
 *
 * @param {string} email - typically the user entered email
 * @param {boolean} - whether or not email is correctly formatted
 */
exports.validateEmail = email => {
  // email must be provided
  if (!email) {
    throw new Error('You need to provide an email.')
  }

  // email must be valid
  if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/.test(email)) {
    throw new Error('Invalid email.')
  }
  return true
}

/**
 *
 * @param {string} phone - typically the user entered phone
 * @param {boolean} - whether or not phone is correctly formatted
 */
exports.validatePhone = phone => {
  if (phone.match(/\d/g).length === 10) {
    return true
  }
  throw new Error('invalid phone number')
}
