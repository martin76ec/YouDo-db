"use strict"

const ava = require("ava")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

let sandbox = null
let setupDatabase = null
let UserStub = null
let TaskStub = null
let AccountStub = null
let SharedTaskStub = null

const modelStubSetter = () => {
  AccountStub = {
    belongsTo: function() {}
  }
  UserStub = {
    hasOne: function() {},
    belongsTo: function() {},
    belongsToMany: function() {}
  }
  TaskStub = {
    hasOne: sinon.spy(),
    belongsToMany: sinon.spy()
  }
  SharedTaskStub = {
    hasMany: function() {}
  }
}

ava.beforeEach(() => {
  sandbox = sinon.createSandbox()

  modelStubSetter()
   
  setupDatabase = proxyquire("../", {
    "./models/user": () => UserStub,
    "./models/account": () => AccountStub,
    "./models/task": () => TaskStub,
    "./models/sharedTask": () => SharedTaskStub
  })
})

ava.afterEach(() => {
  sandbox && sandbox.restore()
})

ava.serial("task relationships", test => {
  const database = setupDatabase({ dialect: "mariadb" })
  test.true(TaskStub.hasOne.called, "TaskStub should call hasOne")
  test.true(TaskStub.hasOne.calledWith(UserStub), "TaskStub should call hasOne with User as argument")
  test.true(TaskStub.belongsToMany.called, "TaskStub should call belongsToMany")
  test.true(TaskStub.belongsToMany.calledWith(UserStub), "TaskStub should call belongsToMany with SharedTaskStub as argument")
})
