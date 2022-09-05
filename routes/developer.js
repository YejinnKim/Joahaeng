const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    let user = req.session.user
    res.render('developer', {page: '개발팀 소개', user: user})
})

module.exports = router