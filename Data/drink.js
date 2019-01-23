const { st } = require('../knex-postgis')
const casual = require('casual')

casual.define('drink', (lat, long) => ({
  id: casual.uuid,
  type: casual.random_element(['BEER', 'WINE', 'LIQUOR', 'MIXED']),
  name: casual.random_element([
    'Bliss',
    'Jada',
    'Diego',
    'Dalton',
    'Elizabeth',
    'Kofi',
    'Spencer',
  ]),
  coordinates: st.geomFromText(`Point(${lat} ${long})`, 4326),
  lat,
  long,
}))

const locations = [
  { lat: 7.504089, long: 37.199992 },
  { lat: 17.504089, long: 27.199992 },
  { lat: -7.504089, long: -37.199992 },
  { lat: 6.504089, long: 27.199992 },
  { lat: 78.504089, long: 45.199992 },
  { lat: 3.504089, long: 7.199992 },
  { lat: 47.504089, long: 22.199992 },
]

const drinks = locations.map(loc => casual.drink(loc.lat, loc.long))

module.exports = drinks
