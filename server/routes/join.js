const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/', (req, res) => {
    res.render('join')
})

module.exports = router