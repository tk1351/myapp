const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoServer = new MongoMemoryServer()

const setup = async () => {
  const mongoUri = await mongoServer.getUri()
  process.env.mongoUrl = mongoUri
  global.mongoServer = mongoUri
}

module.exports = setup
