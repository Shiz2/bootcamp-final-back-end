require('dotenv').config()

module.exports = {
  tokenSecret: process.env.TOKEN_SECRET || 'reughdjsasdkpmasipkmsdfadf',
  saltRounds: process.env.SALT_ROUNDS || 10,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 5000,
}
