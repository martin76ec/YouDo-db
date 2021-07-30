"use strict"

const Sequelize = require("sequelize")
let database = null

module.exports = function setupDatabase(config) { 
  if(!database) {
    database = new Sequelize(config)
  }

  return database
}
