const { GraphQLScalarType } = require('graphql')
const moment = require('moment')

const TimeStamp = new GraphQLScalarType({
  name: 'TimeStamp',
  description: 'An ISO-8601 encoded UTC date string.',
  serialize(dateString) {
    const dateMoment = moment(dateString, moment.ISO_8601)
    if (!dateMoment.isValid()) {
      throw new Error(
        'DateTime cannot represent an invalid ISO-8601 Date string',
      )
    }
    return dateMoment.format()
  },
  parseValue(dateString) {
    const dateMoment = moment(dateString, moment.ISO_8601)
    if (!dateMoment.isValid()) {
      throw new Error(
        'DateTime cannot represent an invalid ISO-8601 Date string',
      )
    }
    return dateMoment.format()
  },
  parseLiteral(ast) {
    const dateMoment = moment(ast.value, moment.ISO_8601)
    if (!dateMoment.isValid()) {
      throw new Error(
        'DateTime cannot represent an invalid ISO-8601 Date string',
      )
    }
    return dateMoment.format()
  },
})

exports.TimeStamp = TimeStamp
