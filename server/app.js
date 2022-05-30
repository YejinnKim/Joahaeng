const express = require('express')
const app = express()
const port = 3000
const path = require('path')

const router = require('./routes/route')

app.use(router)

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.set('views', __dirname + '/../client/views')
app.use(express.static(__dirname + '/../client/views'))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})