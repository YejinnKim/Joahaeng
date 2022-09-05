const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        res.render('propensity', {page: '여행 성향 분석', user: user})
    }
})

module.exports = router