exports.up = function(knex, Promise) {
  return knex.schema.table('drinks', table => {
    table.float('lat').notNull()
    table.float('long').notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.table('drinks', table => {
    table.dropColumn('lat')
    table.dropColumn('long')
  })
}
