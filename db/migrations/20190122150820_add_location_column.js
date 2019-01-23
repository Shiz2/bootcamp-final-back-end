exports.up = function(knex) {
  return knex.schema.table('drinks', table => {
    table.specificType('coordinates', 'GEOMETRY').notNull()
  })
}

exports.down = function(knex) {
  return knex.schema.table('drinks', table => {
    table.dropColumn('coordinates')
  })
}
