const connectToDatabase = require("./dbConnection")

// Option 1: Passing a connection URI
const dbConnection = async () => {
  const dbOptions = {
    dialect: "postgres",
  }

  return connectToDatabase(dbOptions)
}

module.exports = dbConnection
