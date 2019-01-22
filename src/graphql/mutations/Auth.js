const User = require('../../models/User')
const passwords = require('../../lib/passwords')
const tokens = require('../../lib/tokens')

const loginUser = async (obj, { input }) => {
  try {
    const { email, password } = input

    // check that no empty string is provided (mediocre email/passward validation :D)
    if (!email || !password) {
      throw new Error('Invalid input')
    }
    const user = await User.query().findOne('email', email)

    if (!user) {
      throw new Error('Email does not exist.')
    }

    if (!user) {
      throw new Error('Password not provided')
    }
    const valid = await passwords.comparePassword(password, user.password)

    if (!valid) {
      throw new Error('Invalid password.')
    }

    const token = tokens.createToken(user.id)

    return {
      success: true,
      token,
      user,
    }
  } catch (error) {
    console.error(error)
    return {
      error: { message: error.message },
      success: false,
    }
  }
}

const resolver = {
  Mutation: { loginUser },
}

module.exports = resolver
