"use strict"

const Sequelize = require("sequelize")
const setupDatabase = require("../lib/database")

module.exports = function setupUserModel(config) {
  const database = setupDatabase(config)
  
  return database.define("users", {
    user_id: {
      type: Sequelize.TEXT,
      primaryKey: true,
      allowNull: false
    },
    user_name: {
      type: Sequelize.STRING(250),
      allowNull: false
    },
    user_nickname: {
      type: Sequelize.STRING(250),
      allowNull: false
    },
    user_tag: {
      type: Sequelize.INTEGER,
      unique: true,
      allowNull: false
    }
  })
}
