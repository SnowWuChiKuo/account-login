const express = require('express')
const mongoose = require('mongoose')

const app = express()
const port = 3000

mongoose.connect('mongodb://localhost/account-login', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected')
})

app.get('/', (req, res) => {
  console.log('wwww')
})


app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})