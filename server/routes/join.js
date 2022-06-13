const express = require('express')
const router = express.Router()
const db = require('../config/database')

router.get('/', (req, res) => {
    res.render('join')
})

router.post('/', (req, res) => {
    var user = [req.body.id, req.body.pw, req.body.name, req.body.phone]
    db.query('insert into user(user_ID, password, name, phone) values (?, ?, ?, ?)', user, (err, result) => {
        if (err) throw err
        res.redirect('/login')
    })
})

module.exports = router