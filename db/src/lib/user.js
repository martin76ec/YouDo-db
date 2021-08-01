"user strict"

module.exports = async function setupUser(UserModel) {
  function createUser(user) {
    const user = await UserModel.create(user)
    .catch(error => {
      throw(new Error("Cannot write user in database"))
    })

    return user
  }

  function findById(user_id) {
    return UserModel.findAll({
      attributes: ["user_id", "user_name", "user_nickname"],
      where: {
        user_id: user_id
      }
    }).shift()
  }

  function updateUser(data, user) {
    const user = await.UserModel.update(data, {
      where: {
        user_id: user.user_id
      }
    })
  }
}