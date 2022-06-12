const express = require('express')
const router = express.Router()
const path = require('path')

const tourAPI = require('./tourAPI')
const location = require('./location')
const search_location = require('./search_location')
const login = require('./login')
const join = require('./join')

router.get('/', (req, res) => {
    res.render('index')
})

router.use('/api-test', tourAPI)
router.use('/location', location)
router.use('/search-location', search_location)
router.use('/login', login)
router.use('/join', join)

module.exports = router;