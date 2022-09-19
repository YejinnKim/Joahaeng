const express = require('express')
const router = express.Router()
const request = require('request')
const db = require('./db')

router.get('/', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        var id
        if (user) id = user.id
        var board_sql = `SELECT * FROM board WHERE user_ID='${id}' ORDER BY board_ID DESC`
        var image_sql = `SELECT board_ID, filename FROM image`
        var mytrip_sql = `SELECT * FROM mytrip WHERE user_ID='${id}'`
        db.query(board_sql, (err, board_result) => {
            if (err) throw err
            db.query(image_sql, (err, image_result) => {
                if (err) throw err
                db.query(mytrip_sql, (err, mytrip_result) => {
                    if (err) throw err
                    res.render('mytrip', {page: '나의 여행', user: user, boardData: board_result, image: image_result, data: mytrip_result})
                })
            })
        })
    }
})

router.get('/zzim', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        var sql = `INSERT INTO mytrip (contentid, user_ID) VALUES ('${req.query.contentid}', '${user.id}')`
        db.query(sql, (err, result) => {
            if (err) throw err
            res.redirect('/place')
        })
    }
})

module.exports = router