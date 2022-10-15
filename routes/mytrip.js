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
        var sql = `SELECT * FROM mytrip WHERE user_ID='${id}'`
        
        db.query(sql, (err, result) => {
            if (err) throw err
            res.render('mytrip', {page: '나의 여행', user: user, data: result})
        })
    }
})

router.get('/board', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        var id
        if (user) id = user.id
        var board_sql = `SELECT * FROM board WHERE user_ID='${id}' ORDER BY board_ID DESC`
        var image_sql = `SELECT board_ID, filename FROM image`
        
        db.query(board_sql, (err, board_result) => {
            if (err) throw err
            db.query(image_sql, (err, image_result) => {
                if (err) throw err
                res.render('mytrip_board', {page: '나의 여행', user: user, boardData: board_result, image: image_result})
            })
        })
    }
})

router.get('/propensity', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        var propensity_sql = `select mbti from user where user_id='${req.session.user.id}'`
        db.query(propensity_sql, (err, propensity_result) => {
            if (err) throw err
            res.render('mytrip_propensity', {page: '나의 여행', user: user, propensity_result:propensity_result[0]})
        })
        
    }
})

router.post('/zzim', (req, res) => {
    let user = req.session.user
    let url = 'http://apis.data.go.kr/B551011/KorService/detailCommon'
    url += `?ServiceKey=${process.env.APIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&defaultYN=Y`
    url += `&firstImageYN=Y`
    url += `&addrinfoYN=Y`
    url += `&mapinfoYN=Y`
    url += `&contentId=${req.body.contentid}`

    if (!user) res.status(400).send({message: "로그인 후 이용할 수 있습니다."})
    else {
        request (
            {url: url, method: 'GET'}, (error, response, body) => {
                let data = JSON.parse(body).response.body.items.item[0]
                let sql = `INSERT INTO mytrip (user_ID, contentid, title, addr, image, mapx, mapy) VALUES (`
                sql += `'${user.id}', '${req.body.contentid}', `
                sql += `'${data.title}', '${data.addr1}', '${data.firstimage}', '${data.mapx}', '${data.mapy}')`

                db.query(sql, (err, result) => {
                    if (err) throw err
                    res.status(200).send()
                })
            }
        )
    }
})

router.delete('/zzim', (req, res) => {
    let sql = `DELETE FROM mytrip WHERE contentid='${req.body.contentid}'`
    db.query(sql, (err, result) => {
        if (err) throw err
        res.status(200).send()
    })
})

module.exports = router