const path = require('path')
const express = require('express')
const routes = require('./routes')
const app = express()
const bp = require('body-parser')
const validator = require('express-validator');
const helmet = require('helmet');
const csrf = require('csurf')
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash = require('express-flash');

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

const middleware = [
    express.static(path.join(__dirname, 'public')),
    bp.urlencoded({extended: true}),
    validator(),
    cookieParser(),
    csrf({cookie: true}),
    session({
        secret: 'bigsecret',
        key:'biggersecret',
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge:60000}
    }),
    flash()
]

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
