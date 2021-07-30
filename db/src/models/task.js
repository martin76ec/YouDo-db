"use strict"

const Sequelize = require("sequelize")
const setupDatabase = require("../lib/database")

module.exports = function setupTaskModel(config) {
  const database = setupDatabase(config)

  return database.define("tasks", {
    task_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    task_title: {
      type: Sequelize.TEXT(600),
      allowNull: false
    },
    task_description: {
      type: Sequelize.TEXT,
      allowNull: false
    },
    task_status: {
      type: Sequelize.INTEGER(1),
      default: 1, //1 => not started | 2 => started | 3 => finished
      allowNull: false
    }
  })
}
