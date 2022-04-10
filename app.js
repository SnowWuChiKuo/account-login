const express = require('express')         // 載入 express
const mongoose = require('mongoose')       // 載入 mongoose
const exphbs = require('express-handlebars')  // 載入 handlebars
const Account = require('./models/account')   // 載入 models裡的account

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
    .then(data => data ? data : res.redirect('/')) // 確認是否與資料庫的資料相同
    .then(data => res.render('show', { data }))
    .catch(error => console.log(error))
})


app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})