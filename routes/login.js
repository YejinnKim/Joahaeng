const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/', (req, res) => {
    let user = req.session.user
    res.render('login', {page: '로그인', user: user})
})

router.post('/', (req, res) => {
    var sql = `SELECT * FROM user WHERE user_id = '${req.body.id}' AND password = '${req.body.pw}'`

    db.query(sql, (err, result) => {
        if (err) throw err
        if (result[0]) {
            req.session.user = {
                id: req.body.id,
                pw: req.body.pw
            }
            res.status(200).send()
        } else {
            res.status(400).send({message: '존재하지 않는 회원 정보입니다.'})
        }
    })
})

module.exports = router