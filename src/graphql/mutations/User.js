const User = require('../../models/User')
const passwords = require('../../lib/passwords')
const tokens = require('../../lib/tokens')
const _ = require('lodash')

const createUser = async (obj, { input }) => {
  const registerInput = _.pick(input, ['name', 'email', 'password'])

  // check that no empty string is provided (mediocre email/passward validation :D)
  if (!input.email || !input.password || !input.name) {
    throw new Error('Invalid input')
  }

  const result = await User.query().findOne('email', input.email)

  if (result) {
    return {
      error: { message: 'Email already exists!' },
      success: false,
    }
  }

  const hash = await passwords.encryptPassword(input.password)

  registerInput.password = hash

  const user = await User.query().insertWithRelatedAndFetch(registerInput)

  if (!user) {
    return {
      error: { message: 'There was an error registering your information.' },
      success: false,
    }
  }

  const token = tokens.createToken(user.id)

  return {
    user,
    token,
    success: true,
  }
}

const resolver = { Mutation: { createUser } }

module.exports = resolver
