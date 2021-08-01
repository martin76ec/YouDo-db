"use strict"

const setupDatabase = require("./lib/database")
const setupAccountModel = require("./models/account")
const setupSharedTaskModel = require("./models/sharedTask")
const setupTaskModel = require("./models/task")
const setupUserModel = require("./models/user")

module.exports = async function(config) {
  const database = setupDatabase(config)
  const Account = setupAccountModel(config)
  const SharedTask = setupSharedTaskModel(config)
  const Task = setupTaskModel(config)
  const User = setupUserModel(config) 
  User.hasOne(Account)
  Account.belongsTo(User)
  Task.hasOne(User)
  User.belongsTo(Task)
  Task.belongsToMany(User, { through: SharedTask })
  User.belongsToMany(Task, { through: SharedTask })

  try {
    await database.authenticate()
  } catch (error) {
    throw new Error("Can not authenticate into the database")
  }

  if(config.setup) {
    database.sync({ force: true })
  }

  return {
    Account,
    User,
    SharedTask: {},
    Task: {}
  }
}