exports.up = async function(knex, Promise) {
  await knex.schema.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')
}

exports.down = async function(knex, Promise) {
  await knex.schema.raw('DROP EXTENSION "uuid-ossp";')
}
