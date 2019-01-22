const gql = require("graphql-tag");

module.exports = gql`
  type Query {
    user(email: String!): User!
    # post(id: ID!): Post!
    # posts: [Post!]
    # friend(id: ID!): [User!]
  }

  type Mutation {
    createUser(input: CreateUserInput!): LoginReturn!
    createDrink(input: CreateDrinkInput!): CreateDrinkReturn!
    loginUser(email: String!, password: String!): LoginReturn!
    # friendLink(followId: ID!, followingId: ID!): FriendReturn!
  }

  type FriendReturn {
    friend: Friend
    error: Error
  }

  type CreateDrinkReturn {
    drink: Drink
    error: Error
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
  }

  input CreateDrinkInput {
    id: ID!
    drink: DrinkInput!
    time: String!
  }

  input DrinkInput {
    drink: DrinkTypes!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    drinks: [Drink!]!
  }

  type Drink {
    id: ID!
    type: DrinkType!
    userId: ID!
    createdAt: String!
  }

  #   type Friend {
  #     id: ID!
  #     followingId: ID!
  #     followerId: ID!
  #   }

  type LoginReturn {
    user: User
    token: String
    error: Error
  }

  type Error {
    message: String
  }

  enum DrinkTypes {
    BEER
    WINE
    LIQUOR
    MIXED
  }

  type DrinkType {
    id: ID!
    hobby: Drinks!
  }
`;
