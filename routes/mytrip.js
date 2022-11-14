const express = require('express')
const router = express.Router()
const request = require('request')
const db = require('./db')

router.get('/', (req, res) => {
    let area = [{"code": "1", "name": "서울"},
                {"code": "2", "name": "인천"},
                {"code": "3", "name": "대전"},
                {"code": "4", "name": "대구"},
                {"code": "5", "name": "광주"},
                {"code": "6", "name": "부산"},
                {"code": "7", "name": "울산"},
                {"code": "8", "name": "세종"},
                {"code": "31", "name": "경기도"},
                {"code": "32", "name": "강원도"},
                {"code": "33", "name": "충청북도"},
                {"code": "34", "name": "충청남도"},
                {"code": "35", "name": "경상북도"},
                {"code": "36", "name": "경상남도"},
                {"code": "37", "name": "전라북도"},
                {"code": "38", "name": "전라남도"},
                {"code": "39", "name": "제주도"}]

    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        var id
        if (user) id = user.id
        var sql = `SELECT * FROM mytrip WHERE user_ID='${id}'`
        
        db.query(sql, (err, result) => {
            if (err) throw err
            db.query(`SELECT DISTINCT area FROM mytrip WHERE user_ID='${id}'`, (err, area_result) => {
                let myarea = area_result.map((element) => {
                    for (const value of area) {
                        if (value.code == element.area)
                            return {"code": value.code, "name": value.name}
                    }
                })
                res.render('mytrip', {page: '나의 여행', user: user, data: result, area: myarea})
            })
        })
    }
})

router.post('/area', (req, res) => {
    var sql = `SELECT * FROM mytrip WHERE user_ID='${req.session.user.id}' and area='${req.body.area}' ORDER BY mapx`
    db.query(sql, (err, result) => {
        res.send({result: result})
    })
})

router.post('/directions', (req, res) => {
    let start = (req.body.start).replace("\'", "")
    let goal = (req.body.goal).replace("\'", "")
    let headers = {
        'X-NCP-APIGW-API-KEY-ID': process.env.naverAPIKEY,
        'X-NCP-APIGW-API-KEY': process.env.naversAPIKEY
    }
    request({
        url:`https://naveropenapi.apigw.ntruss.com/map-direction/v1/driving?start=${start}&goal=${goal}`,
        headers: headers
    }, (error, response, body) => {
        res.send(body)
    })
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
    url += `?ServiceKey=${process.env.tourAPIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&defaultYN=Y`
    url += `&firstImageYN=Y`
    url += `&addrinfoYN=Y`
    url += `&mapinfoYN=Y`
    url += `&areacodeYN=Y`
    url += `&contentId=${req.body.contentid}`

    if (!user) res.status(400).send({message: "로그인 후 이용할 수 있습니다."})
    else {
        request (
            {url: url, method: 'GET'}, (error, response, body) => {
                let data = JSON.parse(body).response.body.items.item[0]
                let sql = `INSERT INTO mytrip (user_ID, contentid, title, addr, image, mapx, mapy, area) VALUES (`
                sql += `'${user.id}', '${req.body.contentid}', `
                sql += `'${data.title}', '${data.addr1}', '${data.firstimage}', '${data.mapx}', '${data.mapy}', '${data.areacode}')`

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