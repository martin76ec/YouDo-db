"use strict"

const ava = require("ava")
const getDatabaseManager = require("../")

const config = {
  dialect: "sqlite",
  pool: {
    max: 10,
    min: 0,
    idle: 10000
  },
  query: {
    raw: true
  }
}

ava.serial("Index", async test => {
  test.truthy(getDatabaseManager, "Index should return a function")
  const isAsync = getDatabaseManager.constructor.name === "AsyncFunction"
  test.true(isAsync, "Index should return an async function")
})

ava("Database Manager", async test => {
  const databaseManager = await getDatabaseManager(config)
  test.truthy(databaseManager, "Database manager should be returned by getDatabaseManager")
})

ava.serial("Database Entities", async test => {
  const { Account, User, SharedTask, Task } = await getDatabaseManager(config)
  test.truthy(Account, "Account object should exists")
  test.truthy(User, "User object should exists")
  test.truthy(SharedTask, "SharedTask object should exists")
  test.truthy(Task, "Task object should exists")
})
