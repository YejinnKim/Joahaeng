const express = require('express');
const session = require('express-session');
const router = express.Router()
const request = require('request')
const urlencode = require('urlencode');
const db = require('./db')

router.get('/', (req, res) => {
    let user = req.session.user
    let url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList'
    url += `?ServiceKey=${process.env.tourAPIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=200`
    url += `&arrange=P`
    if (req.query.area)
        url += `&areaCode=${req.query.area}`

    request(
        { url: url, method: 'GET' }, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item
            if (user) {
                var id
                if (user) id = user.id
                let sql = `SELECT contentid FROM mytrip WHERE user_ID='${id}'`
                db.query(sql, (err, result) => {
                    res.render('place', { page: '여행지 찾기', user: user, data: dataList, zzim: result })
                })
            } else
                res.render('place', { page: '여행지 찾기', user: user, data: dataList, zzim: 0 })
        }
    )
})

router.get('/search', (req, res) => {
    var dataList
    let url
    let user = req.session.user
    let keyword = urlencode(req.query.keyword)
    let theme = req.query.theme
    let area = req.query.area

    if (keyword)
        url = 'http://apis.data.go.kr/B551011/KorService/searchKeyword'
    else 
        url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList'
    url += `?ServiceKey=${process.env.tourAPIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=100`
    url += `&arrange=P`
    if (keyword)
        url += `&keyword=${keyword}`
    if (theme)
        url += `&cat1=${theme}`
    if (area)
        url += `&areaCode=${area}`
    
    request (
        {url: url, method: 'GET'}, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item
            if (user) {
                var id
                if (user) id = user.id
                let sql = `SELECT contentid FROM mytrip WHERE user_ID='${id}'`
                db.query(sql, (err, result) => {
                    res.render('place', { page: '여행지 찾기', user: user, data: dataList, zzim: result })
                })
            } else
                res.render('place', { page: '여행지 찾기', user: user, data: dataList, zzim: 0 })
        }
    )
})

router.get('/detail', (req, res) => {
    let user = req.session.user
    let category = [{"code":"A01","name":"자연","rnum":1},
                    {"code":"A02","name":"인문","rnum":2},
                    {"code":"A03","name":"레포츠","rnum":3},
                    {"code":"A04","name":"쇼핑","rnum":4},
                    {"code":"A05","name":"음식","rnum":5},
                    {"code":"B02","name":"숙박","rnum":6},
                    {"code":"C01","name":"추천코스","rnum":7}]
    let url = 'http://apis.data.go.kr/B551011/KorService/detailCommon'
    url += `?ServiceKey=${process.env.tourAPIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&contentId=${req.query.contentid}`
    url += `&defaultYN=Y`
    url += `&firstImageYN=Y`
    url += `&addrinfoYN=Y`
    url += `&mapinfoYN=Y`
    url += `&catcodeYN=Y`

    request (
        {url: url, method: 'GET'}, (error, response, body) => {
            data = JSON.parse(body).response.body.items.item[0]
            res.render('place_detail', {page: '여행지 정보', user: user, data: data, category: category})
        }
    )
    
})

module.exports = router