"use strict"

const ava = require("ava")
const setupSharedTaskModel = require("../../models/sharedTask")

ava("Setup SharedTask Model", test => {
  const sharedTask = setupSharedTaskModel({ dialect: "mariadb" })
  test.truthy(sharedTask, "setupSharedTaskModel should return")
  const isFunction = typeof(sharedTask) === "function"
  const isAsync = sharedTask.constructor.name === "AsyncFunction"
  test.true(isFunction, "Setup SharedTaskModel should return a function")
  test.false(isAsync, "Setup SharedTaskModel should not return an async function")
})
