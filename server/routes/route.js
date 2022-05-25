const express = require('express')
const router = express.Router()
const path = require('path')

const tourAPI = require('./tourAPI')
const location = require('./location')
const search_location = require('./search_location')

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../../client/views/index.html"))
})

//router.use('/api-test', tourAPI)
router.use('/location', location)
router.use('/search-location', search_location)

module.exports = router;