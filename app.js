const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Account = require('./models/account')

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

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const postUser = req.body
  Account
    .findOne(postUser)
    .lean()
    .then(data => data ? data : res.redirect('/'))
    .then(data => res.render('show', { data }))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})