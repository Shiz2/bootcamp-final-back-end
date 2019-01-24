const BaseModel = require('./BaseModel')

class Friend extends BaseModel {
  static get tableName() {
    return 'friends'
  }

  static get relationMappings() {
    const User = require('./User')
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'friends.follower',
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = Friend
