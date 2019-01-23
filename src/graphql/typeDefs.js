const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    user(id: ID!): UserQueryReturn!
  }

  type Mutation {
    createUser(input: CreateUserInput!): LoginReturn!
    createDrink(input: CreateDrinkInput!): CreateDrinkReturn!
    loginUser(input: LoginInput!): LoginReturn!
  }

  type UserQueryReturn {
    error: Error
    success: Boolean
    user: User
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

  input LoginInput {
    email: String!
    password: String!
  }

  input CreateDrinkInput {
    type: DrinkInput!
    lat: Float!
    long: Float!
  }

  input DrinkInput {
    drink: DrinkTypes!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    drinks: [Drink]!
  }

  type Drink {
    id: ID!
    type: DrinkType!
    userId: ID!
    createdAt: String!
  }

  type LoginReturn {
    success: Boolean!
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
    drink: DrinkTypes!
  }
`
