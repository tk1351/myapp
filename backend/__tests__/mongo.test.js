const mongo = require('./mongo')
const User = require('../models/user')

afterEach(async () => {
  await mongo.deleteAll()
})

afterAll(async () => {
  await mongo.disconnect()
})

describe('test', () => {
  it('find', () => {
    const result = await User.find({})
    expect(result).toEqual(0)
  })
})