const express = require('express')
const router = express.Router()
const request = require('request')
const db = require('./db')

router.get('/', (req, res) => {
    let user = req.session.user
    let board_sql = `SELECT * FROM board ORDER BY board_ID DESC`
    let image_sql = `SELECT board_ID, filename FROM image`
    if (req.query.contentid) 
        board_sql = `SELECT * FROM board WHERE contentid='${req.query.contentid}' ORDER BY board_ID DESC`

    db.query(board_sql, (err, board_result) => {
        if (err) throw err
        db.query(image_sql, (err, image_result) => {
            res.render('index', { page: 'index', user: user, data: board_result, image: image_result})
        })
    })
})

module.exports = router