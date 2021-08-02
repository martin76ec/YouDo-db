"use strict"

const Sequelize = require("sequelize")
const setupDatabase = require("../lib/database")

module.exports = function setupAccountModel(config) {
  const database = setupDatabase(config)

  return database.define("accounts", {
    account_id: {
      type: Sequelize.STRING(14),
      primaryKey: true,
      allowNull: false
    },
    account_email: {
      type: Sequelize.STRING(250), 
      unique: true,
      allowNull: false
    },
    account_password: {
      type: Sequelize.TEXT
    }
  })
}
