"use static"

const ava = require("ava")
const sinon = require("sinon")
const proxyquire = require("proxyquire")
const userFixtures = require("./fixtures/user")

let id = "0000_000_000_00"
let sandbox = null
let setupDatabase = null
let AccountStub, 
    SharedTaskStub, 
    TaskStub, 
    UserStub =  null

const modelStubSetter = () => {
  DatabaseStub = function() {
    return {
      authenticate: async function() {}
    }
  }
  AccountStub = {
    belongsTo: function() {}
  }
  UserStub = {
    hasOne: sinon.spy(),
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

  UserStub.findByPk = sandbox.stub()
  UserStub.findByPk.withArgs(id).returns(Promise.resolve(userFixtures.findById(id)))
  UserStub.findAll = sandbox.stub()
  UserStub.findAll.returns(Promise.resolve(userFixtures.findAll()))

  setupDatabase = proxyquire("../", {
    "./lib/database": DatabaseStub,
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
})

ava.serial("user#findById", async test => {
  const database = await setupDatabase({ dialect: "mariadb" })
  let found = await database.User.findById(id)
  test.true(UserStub.findByPk.called, "User.findById should be called")
  test.true(UserStub.findByPk.calledWith(id), `User.findById should be called wiith id: ${id}`)
  test.deepEqual(found, userFixtures.findById(id), "User.findById should use the same function passed through UserModel in index")
})

ava.serial("user#findAll", async test => {
  const database = await setupDatabase({ dialect: "mariadb" })
  let found = await database.User.findAll()
  test.true(UserStub.findAll.called, "User.findAll should be called")
  test.deepEqual(found, userFixtures.findAll(), "User.findAll should use the same function passed through UserModel in index")
})
