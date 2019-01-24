exports.up = function(knex, Promise) {
  return knex.schema.createTable('friends', table => {
    table
      .uuid('id')
      .notNull()
      .primary()
    table
      .uuid('follower')
      .references('users.id')
      .notNull()
    table
      .uuid('following')
      .references('users.id')
      .notNull()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('friends')
}
