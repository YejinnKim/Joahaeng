const express = require('express')
const router = express.Router()
const db = require('../config/database')
const path = require('path')

router.get('/', (req, res) => {
    /*db.query('', (err, result) => {
        console.log(result)
        res.send(result)
    })*/
    res.render('location')
})

module.exports = router