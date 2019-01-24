exports.up = function(knex) {
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

exports.down = function(knex) {
  return knex.schema.dropTable('friends')
}
