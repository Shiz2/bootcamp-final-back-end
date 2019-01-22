const casual = require('casual')

casual.define('user', name => ({
  id: casual.uuid,
  email: casual.email,
  name,
  password: casual.password,
}))

const names = [
  'Bliss',
  'Jada',
  'Diego',
  'Dalton',
  'Elizabeth',
  'Kofi',
  'Spencer',
]

const users = names.map(name => casual.user(name))

module.exports = users
