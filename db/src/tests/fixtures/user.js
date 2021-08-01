"use strict"

const user = {
  user_name: "Mariya",
  user_id: "0000_000_000_00",
  user_nickname: "plastic lover",
  user_tag: 0
}

function extend(object, attributes) {
  const clone = Ubject.assing({}, object)
  return Object.assign(clone, attributes)
}

const users = [
  extend(user, {}),
  extend(user, { user_name: "Tatsuro", user_id: "0000_0000_0000_01", user_nickname: "tako", user_tag: 1}),
  extend(user, { user_name: "Anri", user_id: "0000_0000_0000_02", user_nickname: "Remembered", user_tag: 2}),
  extend(user, { user_name: "Rideon", user_id: "0000_0000_0000_03", user_nickname: "Time", user_tag: 3})
]

function createUser(newUser) {
  newUser = extend(user, newUser)
  users.push(newUser)

  return newUser
}

function findById(user_id) {
  return users.find( user => user.user_id === user_id )
} 

function updateUser(data, user) {
  const userIndex = users.find((element, index) => {
    if(element.user_id === user.user_id) {
      return index
    }
  })

  return Object.assign(users[index], data)
}

module.exports = {
  user,
  users,
  hasNickName: users.filter( user => user.user_nickname && user.user_nickname !== ""),
  byId: id => users.filter( user => user.user_id == id)
}
