const User = require('../../models/User')
const bcrypt = require('bcrypt')
const config = require('../../../config')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

const createUser = async (obj, { input }) => {
  const registerInput = _.pick(input, ['name', 'email'])

  const result = await User.query().findOne('email', input.email)

  if (result) {
    return {
      error: { message: 'Email already exists!' },
    }
  }

  const hash = bcrypt.hashSync(input.password, config.saltRounds)

  registerInput.password = hash

  const user = await User.query().insertWithRelatedAndFetch(registerInput)

  if (!user) {
    return {
      error: { message: 'There was an error registering your information.' },
    }
  }

  const payload = { id: user.id }
  const token = jwt.sign(payload, config.tokenSecret)

  return {
    user,
    token,
  }
}

const resolver = { Mutation: { createUser } }

module.exports = resolver
