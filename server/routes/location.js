const express = require('express')
const router = express.Router()
const db = require('../config/database')
const path = require('path')

router.get('/', (req, res) => {
    /*db.query('', (err, result) => {
        console.log(result)
        res.send(result)
    })*/
    res.sendFile(path.join(__dirname, "../../client/views/location.html"))
})

module.exports = router