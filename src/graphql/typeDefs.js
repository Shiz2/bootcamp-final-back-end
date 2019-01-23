const gql = require('graphql-tag')

module.exports = gql`
  scalar TimeStamp
  type Query {
    user(id: ID!): UserQueryReturn!
    drink(id: ID!): DrinkQueryReturn!
    drinks(
      location: Location
      type: DrinkTypes
      date: TimeStamp
    ): DrinksQueryReturn!
    drinks(location: String, type: DrinkTypes, date: String): DrinksQueryReturn!
    number(type: DrinkTypes, time: Times): NumberQueryReturn!
  }

  input Location {
    minLong: String
    minLat: String
    maxLong: String
    maxLat: String
  }

  type NumberQueryReturn {
    error: Error
    success: Boolean
    number: Int
  }

  enum Times {
    HOUR
    DAY
    WEEK
    MONTH
    YEAR
    ALL
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

  type DrinkQueryReturn {
    error: Error
    success: Boolean
    drink: Drink
  }

  type DrinksQueryReturn {
    error: Error
    success: Boolean
    drinks: [Drink]
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
    type: DrinkTypes!
    lat: Float!
    long: Float!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    drinks: [Drink]!
  }

  type Drink {
    id: ID!
    type: String!
    userId: ID!
    createdAt: String
    coordinates: String
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
