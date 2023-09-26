const express = require("express")
const cors = require("cors")
const compression = require("compression")
const helmet = require("helmet")
const route = require("../src/routes")
const handleApplicationErrors = require("../utils/errors")

const initializeApp = () => {
  const app = express()

  app.use(cors())
  app.use(compression())
  app.use(helmet())
  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  route(app)

  app.use(handleApplicationErrors)

  return app
}

module.exports = initializeApp
