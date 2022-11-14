const express = require('express')
const db = require('./db')
const router = express.Router()

router.get('/', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else{
        let user_sql = `SELECT * FROM user WHERE user_id = '${user.id}'`

        db.query(user_sql, (err, user_result) => {
            if (err) throw err
                res.render('myPage', { page: '마이페이지', user: user, data: user_result[0]})
        })
    }
})

router.put('/', (req, res) => {
    let user = req.session.user
    var userUpdate_sql = `UPDATE user SET password = '${req.body.password}', name = '${req.body.name}', phone = '${req.body.phone}' where user_ID='${user.id}'`
    db.query(userUpdate_sql, (err, result) => {
        if (err) throw err
        res.status(200).send({message: '저장됐습니다.'})
    })
})

router.delete('/', (req, res) => {
    let user = req.session.user
    var userDelete_sql = `DELETE FROM user WHERE user_id = '${user.id}'`

    db.query(userDelete_sql, (err, result) => {
        if (err) throw err
        res.status(200).send()
    })
})

module.exports = router