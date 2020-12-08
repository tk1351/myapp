const teardown = async () => {
  await global.mongoServer.stop()
}

module.exports = teardown
