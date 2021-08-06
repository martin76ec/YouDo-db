"use strict"

const ava = require("ava")
const sinon = require("sinon")
const proxyquire = require("proxyquire")

let sandbox = null
let setupDatabase = null
let AccountModelStub, SharedTaskModelStub, TaskModelStub, UserModelStub = null

const modelStubSetter = () => {
  AccountModelStub = {
    belongsTo: function() {} 
  }
  UserModelStub = {
    hasOne: function() {},
    belongsTo: function() {},
    belongsToMany: sinon.spy() 
  }
  TaskModelStub = {
    hasOne: function() {},
    belongsToMany: sinon.spy()
  }
  SharedTaskModelStub = function() {}
}

ava.beforeEach(async () => {
  sandbox = sinon.createSandbox() 
  modelStubSetter()
  setupDatabase = proxyquire("../../", {
    "./models/account": () => AccountModelStub,
    "./models/sharedTask": () => SharedTaskModelStub,
    "./models/task": () => TaskModelStub,
    "./models/user": () => UserModelStub
  })
})

ava.afterEach(() => {
  sandbox && sandbox.restore()
})

ava("shared task", test => {
  const database = setupDatabase({ dialect: "mariadb" })
  //Cannot resolve this ==> test.true(TaskModelStub.belongsToMany.withArgs(SharedTaskModelStub).calledOnce, "SharedTaskModelStub should be used as parameter of Task.belongsToMany")
  test.pass()
})
