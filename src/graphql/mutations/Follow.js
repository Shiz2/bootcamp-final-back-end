const User = require('../../models/User.js')
const Friend = require('../../models/Friend.js')

const addFriend = async (_, { input }, context) => {
  try {
    if (!context.user) {
      throw new Error('User is not logged in')
    }
    // check if user exists
    const user = await User.query()
      .findById(context.user.id)
      .limit(1)

    if (!user) {
      throw new Error('Logged in user does not exist')
    }

    // check if follows exists
    const { email } = input
    const following = await User.query()
      .where('email', email)
      .limit(1)
      .then(rows => rows[0])

    if (!following) {
      throw new Error('User to be followed/friended does not exist')
    }

    user.$relatedQuery('friends').relate(following.id)

    const query = Friend.query().insert({
      follower: context.user.id,
      following: following.id,
    })

    await query

    return {
      code: 200,
      message: 'friend connection has been successfully added',
      success: true,
    }
  } catch (error) {
    return {
      error: { message: error.message },
      success: false,
      code: 400,
    }
  }
}

// const unfollow = async (_, { input }, context) => {
//   try {
//     if (!context.user) {
//       throw new Error('Hobby is not logged in')
//     }
//     // check if user does exist
//     const user = await User.query()
//       .where('id', context.user.id)
//       .limit(1)
//       .then(res => res[0])

//     if (!user) {
//       throw new Error('Logged in user does not exist')
//     }

//     // check if follows exists
//     const { following_id } = input
//     const following = await User.query()
//       .findById(following_id)
//       .limit(1)

//     if (!following) {
//       throw new Error('User to be followed/friended does not exist')
//     }

//     const deleted = await Follow.query()
//       .delete()
//       .where({ following_id })
//       .andWhere('follower_id', context.user.id)

//     if (!deleted) {
//       throw new Error('friend not deleted, check id provided')
//     }

//     return {
//       message: 'friend has been successfully deleted',
//       code: 200,
//       success: true,
//     }
//   } catch (error) {
//     return {
//       message: error.message,
//       code: 400,
//       success: false,
//     }
//   }
// }

const resolver = { Mutation: { addFriend } }

module.exports = resolver
