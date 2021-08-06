"use strict"

const ava = require("ava")
const setupUserModel = require("../../models/user")

ava("setup user model", test => {
  const user = setupUserModel({ dialect: "mariadb" })
  console.log(typeof(user))
  const isFunction = typeof(user) === "function"
  test.true(isFunction, "setupUserModel should return a function")
})
