"use strict"

const ava = require("ava")
const setupDatabase = require("../../lib/database")

ava("database", test => {
  test.truthy(setupDatabase, "setupDatabase should exist")
  const isAsync = setupDatabase.constructor.name === "AsyncFunction"
  test.false(isAsync, "setupDatabase should not be async")
})

ava("database connector", test => {
  const config = { dialect: "mariadb" }
  const database = setupDatabase(config)
  test.truthy(database, "setupDatabase should return an object")
})
