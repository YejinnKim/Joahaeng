const express = require('express')
const app = express()
const port = 3000
const path = require('path')

const router = require('./routes/route')

app.use(express.static(__dirname + '/../client/views'))
app.use(router)

//render 수정 필요
//app.set('views', __dirname + '/client/views')
//app.set('view engine', 'html')

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})