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
    'Sela',
    'Addison',
    'Owen',
    'Anthony',
  ]),
  lat,
  long,
  coordinates: st.geomFromText(`Point(${long} ${lat})`, 4326),
}))

casual.define('coordinates', number => ({
  lat: casual.double((from = 42.367057), (to = 42.382021)),
  long: casual.double((from = -71.134035), (to = -71.101036)),
}))

const coordinates = []
const drinks = []

for (let i = 0; i < 1000; i++) {
  coordinates.push(casual.coordinates(i))
  drinks.push(casual.drink(coordinates[i].lat, coordinates[i].long))
}

module.exports = drinks
