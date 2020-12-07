const request = require('supertest')
const server = 'http://localhost:8080/api/v1/sample'

describe('Get', () => {
  it('return 200 and correct message', () => {
    return request(server)
      .get('')
      .expect(200)
      .expect({ message: 'Hello world' })
  })
})
