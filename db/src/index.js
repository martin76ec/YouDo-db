"use strict"

const debug = require("debug")("youdo-db:setup")
const setupDatabase = require("./lib/database")
const setupAccountModel = require("./models/account")
const setupSharedTaskModel = require("./models/sharedTask")
const setupTaskModel = require("./models/task")
const setupUserModel = require("./models/user")
const setupUser = require("./lib/user") 

module.exports = async function(config) {
  const database = setupDatabase(config)
  const AccountModel = setupAccountModel(config)
  const SharedTaskModel = setupSharedTaskModel(config)
  const TaskModel = setupTaskModel(config)
  const UserModel = setupUserModel(config) 

  UserModel.hasOne(AccountModel)
  AccountModel.belongsTo(UserModel)
  TaskModel.belongsToMany(UserModel, { through: SharedTaskModel })

  try {
    await database.authenticate()
  } catch (error) {
    throw new Error("Can not authenticate into the database")
  }

  if(config.setup) {
    await database.sync({ force: true })
  }

  const User = setupUser(UserModel)

  return {
    Account: {},
    User,
    SharedTask: {},
    Task: {}
  }
}
