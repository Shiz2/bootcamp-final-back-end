const merge = require("lodash.merge");

const user = require("./user");
// const post = require('./post')
// const friend = require('./friend')

const resolvers = [user];

module.exports = merge(...resolvers);
