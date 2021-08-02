"user strict"

module.exports = function setupUser(UserModel) {
  async function createUser(user) {
    const newUser = await UserModel.create(user)
    .catch(error => {
      throw(new Error("Cannot write user in database"))
    })

    return newUser
  }

  async function findAll() {
    return await UserModel.findAll({
      attributes: ["user_id", "user_name", "user_nickname"],
    })
  }

  async function findById(id) {
    return await UserModel.findByPk(id)
  }

  async function updateUser(data, user) {
    const updatedUser = await UserModel.update(data, {
      where: {
        user_id: user.user_id
      }
    })

    return updatedUser
  }

  return {
    createUser,
    findById,
    findAll,
    updateUser
  }
}
