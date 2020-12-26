const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongod

// const mongod = new MongoMemoryServer({
//   autoStart: true,
//   debug: true,
// })

module.exports.connect = async () => {
  mongod = await new MongoMemoryServer({ binary: { version: '4.0.14' } })
  const uri = await mongod.getConnectionString()

  // const mongooseOpts = {
  //   useNewUrlParser: true,
  //   autoReconnect: true,
  //   reconnectTries: Number.MAX_VALUE,
  //   reconnectInterval: 1000,
  // }

  await mongoose.connect(uri, { useNewUrlParser: true })
  mongoose.set('debug', true)
}

module.exports.closeDB = async () => {
  // mongod = new MongoMemoryServer()
  await mongoose.connection.dropDatabase()
  // await mongoose.disconnect()
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
