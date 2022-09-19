const express = require('express')
const router = express.Router()
const request = require('request')
const urlencode = require('urlencode');

router.get('/', (req, res) => {
    let user = req.session.user
    let url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList'
    url += `?ServiceKey=${process.env.APIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=100`
    url += `&arrange=P`
    if (req.query.area)
        url += `&areaCode=${req.query.area}`

    request(
        {url: url, method: 'GET'}, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item
            res.render('place', {page: '여행지 찾기', user: user, data: dataList})
        }
    )
    
})

router.get('/search', (req, res) => {
    var dataList
    let user = req.session.user
    let url = '	http://apis.data.go.kr/B551011/KorService/searchKeyword'
    url += `?ServiceKey=${process.env.APIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=100`
    url += `&arrange=P`
    url += `&keyword=`
    if (req.query.keyword) 
        url += `&keyword=${urlencode(req.query.keyword)}`
    if (req.query.theme) 
        url += `&cat1=${urlencode(req.query.theme)}`
    if (req.query.area) 
        url += `&areaCode=${urlencode(req.query.area)}`
    
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