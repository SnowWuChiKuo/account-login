const express = require('express')


const app = express()
const port = 3000

app.get('/', (req, res) => {
  console.log('wwww')
})


app.listen(port, () => {
  console.log(`App is running in http://localhost:${port}`)
})