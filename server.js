const path = require('path')
const express = require('express')
const routes = require('./routes')
const app = express()


const middleware = express.static(path.join(__dirname, 'public'))

app.use(middleware)

app.use('/', routes)

app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

app.listen(3000, () => {
  console.log(`App running at http://localhost:3000`)
})
