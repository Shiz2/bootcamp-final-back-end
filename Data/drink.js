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
  lat: casual.double((from = 24.9493), (to = 49.5904)),
  long: casual.double((from = -125.0011), (to = -66.9326)),
}))

const coordinates = []
const drinks = []

for (let i = 0; i < 1000; i++) {
  coordinates.push(casual.coordinates(i))
  drinks.push(casual.drink(coordinates[i].lat, coordinates[i].long))
}

module.exports = drinks
