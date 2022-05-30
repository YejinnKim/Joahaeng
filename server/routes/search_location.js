const express = require('express')
const router = express.Router()
const db = require('../config/database')
const path = require('path')
const request = require('request')
const { nextTick } = require('process')

const SERVICE_KEY = 'oWFaix6AQnNY178TIEjwO4pTopibqVNjzZVjy%2Fys8SRFr9vXjBQYhh3CUTUycBlKNw0Nu5hPR7YYQHxadxRC2w%3D%3D'

router.get('/:region', async (req, res) => {

        let url = 'http://api.visitkorea.or.kr/openapi/service/rest/KorService/areaBasedList'
        url += `?ServiceKey=${SERVICE_KEY}`
        url += `&MobileOS=ETC`
        url += `&MobileApp=AppTest`
        url += `&_type=json`
        const region = req.params.region

        db.query('select region_ID from travel_region where region_name = ?', region, (err, result) => {  
            url += `&areaCode=${result[0].region_ID}`
            request(
                {url: url, method: 'GET'}, (error, response, body) => {
                    dataList = JSON.parse(body).response.body.items.item

                    res.render('search_location', {data: dataList})
                }
            )
        })
        
    
})

module.exports = router