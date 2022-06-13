const express = require('express')
const router = express.Router()
const db = require('../config/database')
const path = require('path')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    db.query('select * from user where user_ID = ? and password = ?', [req.body.id, req.body.pw], (err, result) => {
        if (err) throw err
        if (result[0]) {
            req.session.user = {
                id: req.body.id,
                pw: req.body.pw
            } 
        }
        res.redirect('/')
    })
})

module.exports = router