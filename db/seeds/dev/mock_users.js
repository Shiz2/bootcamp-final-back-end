const usersData = require('../../../Data/user')
// const hobbiesData = require('../../../data/hobbies')
const drinksData = require('../../../Data/drink')

const createDrink = (knex, drink, name) =>
  knex('users')
    .where('name', name)
    .first()
    .then(user => {
      const { id, type, coordinates } = drink
      return knex('drinks').insert({
        id,
        type,
        userId: user.id,
        coordinates,
      })
    })

// const createHobby = (knex, hobbyObj, name) => {
//   return knex('users')
//     .where('name', name)
//     .first()
//     .then(user => {
//       const { hobby, id } = hobbyObj
//       return knex('hobbies').insert({
//         id,
//         hobby,
//         userId: user.id,
//       })
//     })
// }

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return (
    knex('users')
      .del()
      // .then(() => knex('hobbies').del())
      .then(() => knex('drinks').del())
      .then(() => knex('users').insert(usersData))
      .then(() => {
        const drinksPromises = drinksData.map(drink =>
          createDrink(knex, drink, drink.name),
        )
        return Promise.all(drinksPromises)
      })
  )
  // .then(() => {
  //   const hobbiesPromises = hobbiesData.map(hobby =>
  //     createHobby(knex, hobby, hobby.name),
  //   )
  //   return Promise.all(hobbiesPromises)
  // })
}
