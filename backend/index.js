const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')
const path = require('path')

const server = http.createServer(app)

if (process.env.NODE_ENV === 'production') {
  app.use('/static', express.static(path.join(__dirname, 'frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 8080
const config = require('./config/dev')

const router = require('./routes')

app.use(cors())

mongoose.connect(process.env.MONGODB_URI || config.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
})

mongoose.Promise = global.Promise

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('DB connected')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/api/v1', router)

app.use(express.static(path.join(__dirname, '../frontend/build')))
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: __dirname }, (err) => {
    if (err) {
      res.status(500).send(err)
    }
  })
})

server.listen(PORT, (error) => {
  if (error) {
    console.error(error)
  } else {
    console.info('listen: ', PORT)
  }
})
