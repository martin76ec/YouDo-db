"use strict"

const ava = require("ava")
const setupTaskModel = require("../models/task")

ava("Setup Task Model", test => {
  const model = setupTaskModel({ dialect: "mariadb" })
  test.truthy(model, "taskModel should return")
  const isFunction = typeof(model) === "function"
  const isAsync = model.constructor.name === "AsyncFunction"
  test.true(isFunction, "setupTaskModel should return a function")
  test.false(isAsync, "setupTaskModel should not return an async function")
})
