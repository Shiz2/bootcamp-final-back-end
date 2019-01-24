const gql = require('graphql-tag')

module.exports = gql`
  type Query {
    user(id: ID!): UserQueryReturn!
    friends: [User]!
    drink(id: ID!): DrinkQueryReturn!
    drinks(input: drinksQuery): DrinksQueryReturn!
    number(input: numberQuery): NumberQueryReturn!
  }

  input drinksQuery {
    location: Location
    type: DrinkTypes
    date: Times
    group: Groups
  }

  input numberQuery {
    type: DrinkTypes
    time: Times
  }

  input Location {
    long: Float
    lat: Float
  }

  type NumberQueryReturn {
    error: Error
    success: Boolean
    number: Int
  }

  enum Groups {
    ALL
    FRIENDS
    ME
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
    addFriend(input: FriendInput!): UserQueryReturn!
  }

  input FriendInput {
    email: String!
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
    friends: [User]!
  }

  type Drink {
    id: ID!
    type: String!
    userId: ID!
    createdAt: String
    lat: String
    long: String
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
    ALL
  }

  type DrinkType {
    id: ID!
    drink: DrinkTypes!
  }
`
