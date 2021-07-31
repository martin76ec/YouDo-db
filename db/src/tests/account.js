"use strict"

const ava = require("ava")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

let AccountStub, TaskStub, SharedTaskStub, UserStub = null
let sandbox = null
let setupDatabase = null

const modelStubSetter = () => {
  AccountStub = {
    belongsTo: sinon.spy()
  }
  UserStub = {
    hasOne: function() {},
    belongsTo: function() {},
    belongsToMany: function() {} 
  }
  TaskStub = {
    hasOne: function() {},
    belongsToMany: function() {}
  }
  SharedTaskStub = {}
}

ava.beforeEach(async() => {
  sandbox = sinon.createSandbox()
  modelStubSetter() 
  setupDatabase = proxyquire("../", {
    "./models/account": () => AccountStub,
    "./models/sharedTask": () => SharedTaskStub,
    "./models/task": () => TaskStub,
    "./models/user": () => UserStub
  })
})

ava.serial("account relationships", test => {
  const database = setupDatabase({ dialect: "mariadb" } )
  test.true(AccountStub.belongsTo.called, "Account should call belongsTo function"),
  test.true(AccountStub.belongsTo.calledWith(UserStub), "Account should call belongsTo function with User as argument")
})
