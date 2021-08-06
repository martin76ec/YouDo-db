"use strict"

const account = {
  account_id: "abc_123_xyz_aa",
  user_id: "000_000_000_00",
  account_email: "mariya@hotmail.com",
  account_password: "pl4st1c l0v3"
}

function extend(object, values) {
  const clone = Object.assign({}, object)
  return Object.assign(clone, values)
}

const accounts = [
  extend(account, {}),
  extend(account, {
    account_id: "abc_123_xyz_ab",
    user_id: "000_000_000_01",
    account_email: "tatsuro@gmail.com",
    account_password: "tatz7 7zm"
  }),
  extend(account, {
    account_id: "abc_123_xyz_ac",
    user_id: "000_000_000_02",
    account_email: "anri@yopmail.com",
    account_password: "4nt0 m4rm4ndo"
  }),
  extend(account, {
    account_id: "abc_123_xyz_ad",
    user_id: "000_000_000_03",
    account_email: "rideon@martmail.com",
    account_password: "ratatoile 44x"
  })
]

function createAccount(newAccount) {
  const accountExists = accounts.find(account => {
    return account.account_id === newAccount.account_id ||
    account.account_email === newAccount.account_email
  })

  if(accountExists) {
    return "[Duplicated] Account already exists."
  }

  return accountExists
}

function getUserId(email, password) {
  const account = accounts.find(account => { 
    return account.account_email === email && 
    account.account_password === password
  })

  if(!account) {
    return "[Not found] Email or password are incorrect."
  }

  return account.user_id
}

function updateAccount(account, values) {
  const accountExists = accounts.find(acc => {
    return acc.account_id === account.account_id ||
    acc.account_email === account.account_email
  })

  if(!accountExists) {
    return "[Not found] Account does not exists."
  }

  return Object.assign(accountExists, values)
}

module.exports = {
  account,
  accounts,
  createAccount,
  getUserId,
  updateAccount
}