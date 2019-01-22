exports.up = function(knex, Promise) {
  return knex.schema.createTable('drinks', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
    table.enu('type', ['BEER', 'WINE', 'LIQUOR', 'MIXED']).notNull()
    table
      .uuid('userId')
      .references('users.id')
      .notNull()

    table
      .timestamp('createdAt')
      .defaultTo(knex.fn.now())
      .notNull()

    // table.specificType('coordinate', 'GEOMETRY').notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('drinks')
}
