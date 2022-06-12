const express = require('express')
const app = express()
const port = 3000
const path = require('path')

const router = require('./routes/route')

app.use(router)

// app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')
app.set('views', __dirname + '/../views')
app.use(express.static(__dirname + '/../views'))

app.use('/css', express.static(path.resolve(__dirname, "../assets/css")))
app.use('/images', express.static(path.resolve(__dirname, "../assets/images")))
app.use('/js', express.static(path.resolve(__dirname, "../assets/js")))

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})