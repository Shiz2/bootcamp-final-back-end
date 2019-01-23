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
  coordinates: st.geomFromText(`Point(${long} ${lat})`, 4326),
  lat,
  long,
}))

const locations = [
  { lat: 27.504089, long: -77.199992 },
  { lat: 37.504089, long: -120.199992 },
  { lat: 27.504089, long: -97.199992 },
  { lat: 46.504089, long: -87.199992 },
  { lat: 48.504089, long: -105.199992 },
  { lat: 33.504089, long: -107.199992 },
  { lat: 47.504089, long: -122.199992 },
]

const drinks = locations.map(loc => casual.drink(loc.lat, loc.long))

module.exports = drinks
