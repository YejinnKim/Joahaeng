const express = require('express')
const router = express.Router()
const db = require('./db')

router.get('/', (req, res) => {
    let user = req.session.user
    res.render('join', {page: '회원가입', user: user})
})

router.post('/', (req, res) => {
    var data = `'${req.body.id}', '${req.body.pw}', '${req.body.name}', '${req.body.phone}'`
    var idck_sql = `SELECT * FROM user WHERE user_id = '${req.body.id}'`
    var ins_sql = `INSERT INTO user (user_ID, password, name, phone) VALUES (${data})`

    db.query(idck_sql, (err, result) => {
        if (err) throw err
        if (result[0]) {
            res.status(400).send({message: '이미 존재하는 ID 입니다.'})
        } else {
            db.query(ins_sql, (err, result) => {
                if (err) throw err
                res.status(200).send({message: '회원가입에 성공하였습니다.'})
            })
        }
    })
})

module.exports = router