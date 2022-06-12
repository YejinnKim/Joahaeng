const express = require('express')
const router = express.Router()
const db = require('../config/database')
const path = require('path')

router.get('/', (req, res) => {
    res.render('login')
})

router.post('/', (req, res) => {
    var user = req.body
    console.log(req.body)
    /* db.query('select * from user where user_ID = ? and password = ?', [user.id, user.pw], (err, result) => {
        if (err) throw err
        if (result[0]) {
            req.session.user = {
                id: user.id,
                pw: user.pw
            } 
        } else {
            res.status(400).send({message: "일치하는 회원 정보가 없습니다."});
        }
        res.redirect('/')
    }) */
    res.redirect('/')
})

module.exports = router