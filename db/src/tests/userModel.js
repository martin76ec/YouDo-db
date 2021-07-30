"use strict"

const ava = require("ava")
const setupUserModel = require("../models/user")

ava("Setup User Model", test => {
  const user = setupUserModel({ dialect: "mariadb" })
  console.log(typeof(user))
  const isFunction = typeof(user) === "function"
  test.true(isFunction, "setupUserModel should return a function")
})
