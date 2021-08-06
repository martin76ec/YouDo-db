"use strict"

module.exports = function(AccountModel) {
  async function createAccount(account) {
    const duplicated = await AccountModel.findOne({
      where: {
        account_email: account.account_email,
      }
    })
    
    if(duplicated) {
      return "[Duplicated] Account already exists."
    }

    const createdAccount = await AccountModel.create(account)
    return !!createdAccount
  }

  async function getUserId(email, password) {
    const account = await AccountModel.findOne({
      where: {
        account_email: email,
        account_password: password
      }
    })

    if(!account) {
      return "[Not found] Email or password are incorrect."
    }

    return account.user_id
  }

  async function updateAccount(account, values) {
    const existing = await AccountModel.findOne({
      where: {
        account_id: account.account_id,
        account_email: account.account_email
      }
    })

    if(!existing) {
      return "[Not found] Account does not exists."
    }

    return await AccountModel.update(values, {
      where: {
        account_id: account.account_id
      }
    })
  }

  return {
    createAccount,
    getUserId,
    updateAccount
  }
}