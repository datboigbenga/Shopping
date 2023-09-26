const initializeApp = require("./app")
const dbConnection = require("./db")

const startApp = async () => {
  const PORT = process.env.PORT || 6000
  const app = initializeApp()

  await dbConnection()

  app.listen(PORT, () => {
    console.log(`app running on port ${PORT}`)
  })
}

module.exports = startApp
