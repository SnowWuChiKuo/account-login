const mongoose = require('mongoose')
const Account = require('../account')
const users = require('../../users')

mongoose.connect('mongodb://localhost/account-login', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection


db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  Account.create(users)
    .then(() => {
      console.log('done')
      db.close()
    })
    .catch(error => console.log(error))
})