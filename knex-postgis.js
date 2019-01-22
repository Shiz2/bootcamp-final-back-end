const Knex = require('knex')
const knexPostgis = require('knex-postgis')
const knexfile = require('./knexfile')

const knex = Knex(knexfile.development)
// install postgis functions in knex.postgis;
const st = knexPostgis(knex)

module.exports = { knex, st }
