const express = require('express')
const router = express.Router()

const place = require('./place')
const board = require('./board')
const propensity = require('./propensity')
const mytrip = require('./mytrip')
const login = require('./login')
const join = require('./join')
const developer = require('./developer')
const index = require('./index')

router.use('/place', place)
router.use('/board', board)
router.use('/propensity', propensity)
router.use('/mytrip', mytrip)
router.use('/login', login)
router.use('/join', join)
router.use('/developer', developer)
router.use('/', index)

router.get('/', (req, res) => {
    let user = req.session.user
    res.render('index', {page: 'index', user: user})
})

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err
        //req.session
    })
    res.redirect('/')
})



module.exports = router