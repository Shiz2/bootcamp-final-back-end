require('dotenv').config()

module.exports = {
  tokenSecret: process.env.TOKEN_SECRET || 'reughdjsasdkpmasipkmsdfadf',
  saltRounds: process.env.SALT_ROUNDS || 10,
  databaseUrl: process.env.DATABASE_URL,
  port: process.env.PORT || 5000,

  db: {
    host: process.env.DB_HOST,
    database: process.env.DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  },
}
