const BaseModel = require('./BaseModel')
const { BelongsToOneRelation } = require('objection')

class Drink extends BaseModel {
  static get tableName() {
    return 'drinks'
  }

  static get relationMappings() {
    const User = require('./User')

    return {
      posts: {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'drinks.userId',
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = Drink
