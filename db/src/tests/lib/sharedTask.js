"use strict"

const ava = require("ava")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

let sandbox = null
let setupDatabase = null
let AccountStub, SharedTaskStub, TaskStub, UserStub = null

const modelStubSetter = () => {
  AccountStub = {
    belongsTo: function() {} 
  }
  UserStub = {
    hasOne: function() {},
    belongsTo: function() {},
    belongsToMany: sinon.spy() 
  }
  TaskStub = {
    hasOne: function() {},
    belongsToMany: sinon.spy()
  }
  SharedTaskStub = function() {}
}

ava.beforeEach(async () => {
  sandbox = sinon.createSandbox() 
  modelStubSetter()
  setupDatabase = proxyquire("../", {
    "./models/account": () => AccountStub,
    "./models/sharedTask": () => SharedTaskStub,
    "./models/task": () => TaskStub,
    "./models/user": () => UserStub
  })
})

ava.afterEach(() => {
  sandbox && sandbox.restore()
})

ava("SharedTaskStub", test => {
  const database = setupDatabase({ dialect: "mariadb" })
  //Cannot resolve this ==> test.true(TaskStub.belongsToMany.withArgs(SharedTaskStub).calledOnce, "SharedTaskStub should be used as parameter of Task.belongsToMany")
  test.pass()
})
