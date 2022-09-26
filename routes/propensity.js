const express = require('express')
const db = require('./db')
const router = express.Router()

router.get('/', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        res.render('propensity', {page: '여행 성향 분석', user: user})
    }
})

router.put('/', (req, res) => {
    var propensity_sql = `UPDATE user SET mbti = '${req.body.mbti}' where user_ID='${req.session.user.id}'`
    db.query(propensity_sql, (err, result) => {
        if (err) throw err
        res.status(200).send({message: '저장됐습니다.'})
    })
})

module.exports = router