const mongod = require('../../mongo')
const Post = require('../../models/post')

beforeAll(async () => {
  await mongod.connect()
})

afterEach(async () => {
  await mongod.clearDB()
})

afterAll(async () => {
  await mongod.closeDB()
})

describe('Post model test', () => {
  it('Post model works correctly', async () => {
    const count = await Post.count()
    expect(count).toEqual(0)
  })
})
