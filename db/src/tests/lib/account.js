"use strict"

const ava = require("ava")
const sinon = require("sinon")
const proxyquire = require("proxyquire")
const accountFixtures = require("../fixtures/account")

let AccountModelStub, DatabaseModelStub, TaskModelStub, SharedTaskModelStub, UserModelStub = null
let sandbox = null
let setupDatabase = null
let account = Object.assign({}, accountFixtures.account)

Object.assign(account, { 
  account_id: "tes_tfo_rac_co",
  account_email: "test@email.com"
})

const modelStubSetter = () => {
  DatabaseModelStub = function() {
    return {
      authenticate: async function() {}
    }
  }
  AccountModelStub = {
    belongsTo: sinon.spy()
  }
  UserModelStub = {
    hasOne: function() {},
  }
  TaskModelStub = {
    belongsToMany: function() {}
  }
  SharedTaskModelStub = {}
}

ava.beforeEach(async() => {
  sandbox = sinon.createSandbox()
  modelStubSetter() 
  AccountModelStub.createAccount = sinon.stub()
  AccountModelStub.createAccount.withArgs(account).returns(accountFixtures.createAccount(account))
  AccountModelStub.findOne = sinon.stub()
  AccountModelStub.findOne.returns(null)
  AccountModelStub.create = accountFixtures.createAccount
  setupDatabase = proxyquire("../../", {
    "./lib/database": DatabaseModelStub,
    "./models/account": () => AccountModelStub,
    "./models/sharedTask": () => SharedTaskModelStub,
    "./models/task": () => TaskModelStub,
    "./models/user": () => UserModelStub
  })
})

ava.serial("account relationships", async test => {
  const database = await setupDatabase({ dialect: "mariadb" } )
  test.true(AccountModelStub.belongsTo.called, "Account should call belongsTo function"),
  test.true(AccountModelStub.belongsTo.calledWith(UserModelStub), "Account should call belongsTo function with User as argument")
})

ava.serial("account#createAccount", async test => {
  const database = await setupDatabase({ dialect: "mariadb"})
  let newAccount = await database.Account.createAccount(account)
  test.deepEqual(newAccount, accountFixtures.createAccount(account), "Account.createAccount should use the function passed through index")
})