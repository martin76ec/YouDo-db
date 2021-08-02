"use strict"

const debug = require("debug")("YouDo-db:setup")
const inquirer = require("inquirer")
const chalk = require("chalk")
const database = require("./")

const prompt = inquirer.createPromptModule()

async function setup() {
  const answer = await prompt([
    {
      type: "confirm",
      name: "setup",
      message: "This will destroy your database, are you sure?"
    }
  ])

  if(!answer.setup) {
    return console.log("Nothing happened...")
  }

  const config = { 
    database: process.env.DB_NAME || "youdo",
    username: process.env.DB_USER || "martin76ec",
    password: process.env.DB_PASS || "youdosecret",
    host: process.env.DB_HOST || "localhost",
    dialect: "mariadb",
    logging: message => debug(message),
    setup: true
  }

  await database(config).catch(handleFatalError)

  console.log("Success")
  process.exit(0)
}

function handleFatalError(error) {
  console.error(`${chalk.red("[fatal error]")} ${error}`)
  console.error(error.stack)
  process.exit(1)
}

setup()
