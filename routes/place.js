const express = require('express')
const router = express.Router()
const request = require('request')

// [{"code":"1","name":"서울"},{"code":"2","name":"인천"},{"code":"3","name":"대전"},{"code":"4","name":"대구"},{"code":"5","name":"광주"},
// {"code":"6","name":"부산"},{"code":"7","name":"울산"},{"code":"8","name":"세종특별자치시"},{"code":"31","name":"경기도"},
// {"code":"32","name":"강원도"},{"code":"33","name":"충청북도"},{"code":"34","name":"충청남도"},{"code":"35","name":"경상북도"},
// {"code":"36","name":"경상남도"},{"code":"37","name":"전라북도"},{"code":"38","name":"전라남도"},{"code":"39","name":"제주도"}]

router.get('/', (req, res) => {
    let user = req.session.user
    let url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList'
    url += `?ServiceKey=${process.env.APIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=20`
    url += `&areaCode=${req.query.area}`

    request(
        {url: url, method: 'GET'}, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item
            res.render('place', {page: '여행지 찾기', user: user, data: dataList})
        }
    )
    
})

router.get('/detail', (req, res) => {
    let user = req.session.user
    res.render('place_detail', {page: '여행지 정보', user: user})
})

module.exports = router