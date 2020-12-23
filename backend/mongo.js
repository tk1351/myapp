const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

const mongod = new MongoMemoryServer({
  autoStart: true,
  debug: true,
})

module.exports.connect = async () => {
  const uri = await mongod.getUri()

  const mongooseOpts = {
    useNewUrlParser: true,
    autoReconnect: true,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 1000,
  }

  await mongoose.connect(uri, mongooseOpts, (err) => {
    if (err) console.error(err)
  })
}

module.exports.closeDB = async () => {
  // await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
  // await mongoose.connection.close()
  await mongod.stop()
}

module.exports.clearDB = async () => {
  const collections = mongoose.connection.collections

  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany()
  }
}
