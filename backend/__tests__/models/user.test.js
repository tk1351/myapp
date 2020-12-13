const mongod = require('../../mongo')
const User = require('../../models/user')

beforeAll(async () => {
  await mongod.connect()
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('User model test', () => {
  it('User model works correctly', async () => {
    const count = await User.count()
    expect(count).toEqual(0)
  })
})
