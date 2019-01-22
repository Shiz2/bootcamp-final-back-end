const BaseModel = require("./BaseModel");
const { HasManyRelation, ManyToManyRelation } = require("objection");

class User extends BaseModel {
  static get tableName() {
    return "users";
  }

  static get relationMappings() {
    const Drink = require("./Drink");
    return {
      drinks: {
        relation: HasManyRelation,
        modelClass: Drink,
        join: {
          from: "users.id",
          to: "drinks.userId"
        }
      }
      //   following: {
      //     relation: ManyToManyRelation,
      //     modelClass: User,
      //     join: {
      //       from: "users.id",
      //       through: {
      //         // follows is the join table.
      //         from: "follows.followerId",
      //         to: "follows.followingId"
      //       },
      //       to: "users.id"
      //     }
      //   }
    };
  }
}

module.exports = User;
