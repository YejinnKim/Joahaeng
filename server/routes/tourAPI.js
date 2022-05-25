const express = require('express')
const router = express.Router()
const request = require('request')
const db = require('../config/database')

const SERVICE_KEY = 'oWFaix6AQnNY178TIEjwO4pTopibqVNjzZVjy%2Fys8SRFr9vXjBQYhh3CUTUycBlKNw0Nu5hPR7YYQHxadxRC2w%3D%3D'

router.get('/', async (req, res) => {
    let url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'
    url += `?ServiceKey=${SERVICE_KEY}`
    url += `&MobileOS=ETC`
    url += `&MobileApp=AppTest`
    url += `&_type=json`
    url += `&areaCode=1`

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