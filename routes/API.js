const express = require('express')
const router = express.Router()
const request = require('request')
const urlencode = require('urlencode');
require('dotenv').config()

router.get('/', async (req, res) => {
    let url = 'http://apis.data.go.kr/B551011/KorService/areaCode'
    url += `?ServiceKey=${process.env.APIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=100`

    request(
        {url: url, method: 'GET'}, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item
            res.send(dataList)
        }
    )
})

router.get('/area', async (req, res) => {
    let url = 'http://apis.data.go.kr/B551011/KorService/areaBasedList'
    url += `?ServiceKey=${process.env.APIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=10`
    //url += `&areaCode=1`

    request(
        {url: url, method: 'GET'}, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item
            res.send(dataList)
        }
    )
})

router.get('/category', async (req, res) => {
    let url = 'http://apis.data.go.kr/B551011/KorService/categoryCode'
    url += `?ServiceKey=${process.env.APIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=50`

    request(
        {url: url, method: 'GET'}, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item
            res.send(dataList)
        }
    )
})

router.get('/search', async (req, res) => {
    let url = '	http://apis.data.go.kr/B551011/KorService/searchKeyword'
    url += `?ServiceKey=${process.env.APIKEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&numOfRows=50`
    keyword = urlencode("강원")
    url += `&keyword=${keyword}`
    
    request(
        {url: url, method: 'GET'}, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item
            res.send(dataList)
        }
    )
})

router.get('/dbinsert', async (req, res) => {
    let url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaCode'
    url += `?ServiceKey=${SERVICE_KEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`

    request(
        {url: url, method: 'GET'}, (error, response, body) => {
            dataList = JSON.parse(body).response.body.items.item

            for (data of dataList) {
                var inputData = [data.code, data.name]
                db.query('INSERT INTO travel_region values (?, ?)', inputData)
            }

            res.send('insert region data')
        }
    )
})

module.exports = router