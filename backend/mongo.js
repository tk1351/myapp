const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

const mongod = new MongoMemoryServer({ debug: true })

module.exports.connect = async () => {
  const uri = await mongod.getConnectionString()

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  }

  await mongoose.connect(uri, mongooseOpts)
}

module.exports.closeDB = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongod.stop()
}

module.exports.clearDB = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
