const express = require('express')
const router = express.Router()
const path = require('path')

const tourAPI = require('./tourAPI')
const location = require('./location')
const search_location = require('./search_location')

router.get('/', (req, res) => {
    res.render('index')
})

router.use('/api-test', tourAPI)
router.use('/location', location)
router.use('/search-location', search_location)

module.exports = router;