"use static"

const ava = require("ava")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

let sandbox = null
let setupDatabase = null
let AccountStub, 
    SharedTaskStub, 
    TaskStub, 
    UserStub =  null

const modelStubSetter = () => {
  AccountStub = {
    belongsTo: function() {}
  }
  UserStub = {
    hasOne: sinon.spy(),
    belongsTo: sinon.spy(),
    belongsToMany: sinon.spy()
  }
  TaskStub = {
    hasOne: function() {},
    belongsToMany: function() {}
  }
  SharedTaskStub = {
    hasMany: function() {}
  }
}

ava.beforeEach(async() => {
  sandbox = sinon.createSandbox()

  modelStubSetter()

  setupDatabase = proxyquire("../", {
    "./models/user": () => UserStub,
    "./models/account": () => AccountStub,
    "./models/task": () => TaskStub,
    "./models/sharedTask": () => SharedTaskStub
  })
})

ava.afterEach(test => {
  sandbox && sandbox.restore()
})

ava.serial("user relationships", test => {
  const config = { dialect: "mariadb" }
  const database = setupDatabase(config)
  test.true(UserStub.hasOne.called, "User should call hasOne function")
  test.true(UserStub.hasOne.calledWith(AccountStub), "User should call hasOne function with Account as argument")
  test.true(UserStub.belongsTo.called, "User should call belongsTo function")
  test.true(UserStub.belongsTo.calledWith(TaskStub), "User should call belongsTo function with Task as argument")
  test.true(UserStub.belongsToMany.called, "User should call belongsToMany function")
  test.true(UserStub.belongsToMany.calledWith(TaskStub), "User should call belongsToMany function with Task as argument")
})
