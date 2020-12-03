const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')

const server = http.createServer(app)
const PORT = process.env.PORT || 8080
const config = require('./config/dev')

const router = require('./routes')

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
)

mongoose.connect(config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('DB connected')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', router)

server.listen(PORT, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('listen: ', PORT)
  }
})
