const express = require('express')
const expressLayout = require('express-ejs-layouts')
const session = require('express-session')
const path = require('path')
const app = express()
const cors = require('cors')
const router = require('./routes/route')
require('dotenv').config()
const port = process.env.PORT

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layout')
app.set('layout extractScripts', true)

app.use(cors())
app.use(expressLayout)
app.use(express.json())
app.use(express.urlencoded({extended : true }))
app.use(session({
    secret: 'abc',
    resave: true,
    saveUninitialized: true
}))
app.use(express.static(__dirname + '/views'))
app.use('/public', express.static(path.join(__dirname, 'public')))

app.use(router)

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})