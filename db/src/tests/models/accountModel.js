"use strict"

const ava = require("ava")
const setupAccountModel = require("../../models/account")

ava("setup account model", test => {
  const account = setupAccountModel({ dialect: "mariadb" })
  const isFunction = typeof(account) === "function"
  test.true(isFunction, "setupAccountModel should return a function")
  const isAsync = account.constructor.name === "AsyncFunction"
  test.false(isAsync, "setupDatabase should not return an async function")
})
