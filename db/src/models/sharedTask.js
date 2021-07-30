"use strict"

const Sequelize = require("sequelize")
const setupDatabase = require("../lib/database")

module.exports = function setupSharedTaskModel(config) {
  const database = setupDatabase(config)

  return database.define("shared_tasks", {})
}
