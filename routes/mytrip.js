const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        res.render('mytrip', {page: '나의 여행', user: user})
    }
})

module.exports = router