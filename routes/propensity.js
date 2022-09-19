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

router.post('/', (req, res) => {
    var propensity_sql = `UPDATE user SET propensity = '${req.body.propeneity}' where user_ID='${req.session.id}'`
    db.query(propensity_sql, (err, result) => {
        if (err) throw err
    })
})

module.exports = router