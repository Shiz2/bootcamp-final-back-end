const BaseModel = require('./BaseModel')
const { HasManyRelation } = require('objection')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    const Drink = require('./Drink')
    return {
      drinks: {
        relation: HasManyRelation,
        modelClass: Drink,
        join: {
          from: 'users.id',
          to: 'drinks.userId',
        },
      },
    }
  }
}

module.exports = User
