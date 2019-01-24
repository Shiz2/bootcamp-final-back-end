const User = require('../../models/User')

const addFriend = async (obj, { email }, context) => {
  if (!context.user) {
    return {
      error: {
        message: 'User not logged in',
      },
    }
  }

  const follower = await User.query().findById(context.user.id)
  const following = await User.query()
    .where('email', email)
    .then(res => res[0])

  if (!following) {
    return {
      error: {
        message: 'Can not find the user',
      },
    }
  }
  console.log(following.id)
  console.log(following)
  //const friend = await follower.$relatedQuery('friends').insert(following)
  const friend = await follower.$setRelated('friends', following)

  console.log(friend)

  if (!friend) {
    throw new Error('Could not add friend')
  }

  return {
    user: following,
  }
}

const resolver = { Mutation: { addFriend } }

module.exports = resolver
