exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
    table.text('name').notNull()
    table
      .text('email')
      .unique()
      .notNull()
    table.text('password').notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
}
