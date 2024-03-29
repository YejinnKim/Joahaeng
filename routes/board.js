const express = require('express')
const router = express.Router()
const path = require('path')
const request = require('request')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './public/uploads')
    },
    filename: (req, file, cd) => {
        const ext = path.extname(file.originalname)
        cd(null, file.fieldname + '-' + Date.now() + ext)
    }
})
const upload = multer({ storage: storage })
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
            res.render('board_list', { page: '여행 후기', user: user, data: board_result, image: image_result})
        })
    })
})

router.get('/write', (req, res) => {
    let user = req.session.user
    if (!user) res.redirect('/login')
    else {
        if (req.query.boardid) {
            var board_sql = `SELECT * FROM board WHERE board_ID='${req.query.boardid}'`
            var img_sql = `SELECT * FROM image WHERE board_ID='${req.query.boardid}'`
            db.query(board_sql, (err, board_result) => {
                if (err) throw err
                db.query(img_sql, (err, image_result) => {
                    res.render('board_write', {page: '여행 후기 작성', user: user, data: board_result[0], image: image_result, title: 0})
                })
            })
        } else if (req.query.contentid) {
            let url = 'http://apis.data.go.kr/B551011/KorService/detailCommon'
            url += `?ServiceKey=${process.env.tourAPIKEY}`
            url += `&MobileOS=ETC`
            url += `&MobileApp=AppTest`
            url += `&_type=json`
            url += `&contentId=${req.query.contentid}`
            url += `&defaultYN=Y`
            request (
                {url: url, method: 'GET'}, (error, response, body) => {
                    var data = JSON.parse(body).response.body.items.item[0].title
                    res.render('board_write', {page: '여행 후기 작성', user: user, data: 0, title: data})
                }
            )
        } else 
            res.render('board_write', {page: '여행 후기 작성', user: user, data: 0, title: 0})
    }
})

router.post('/write', (req, res) => {
    var data = `'${req.session.user.id}', '${req.body.title}', '${req.body.content}', '${req.body.tag}', '${req.body.contentid}'`
    var board_sql = `INSERT INTO board (user_ID, title, content, tag, contentid) VALUES (${data})`
    var img = req.body.image
    var filename
    var img_sql = `INSERT INTO image (board_ID, filename) VALUES (?, ?)`

    db.query(board_sql, (err, result) => {
        if (err) throw err
        db.query('SELECT board_ID FROM board ORDER BY board_ID DESC limit 1', (err, result) => {
            if (err) throw err
            if (img.includes(',')) {
                db.query('UPDATE board SET multiple=1 WHERE board_ID=?', result[0].board_ID, (err, result) => {})
                filename = img.split(',')
                for (let i=0; i < filename.length; i++) {
                    db.query(img_sql, [result[0].board_ID, filename[i]], (err, result) => {
                        if (err) throw err
                    })
                }
            } else {
                db.query(img_sql, [result[0].board_ID, img], (err, result) => {
                    if (err) throw err
                })
            }
        })
        res.status(200).send()
    })
})

router.post('/image', upload.array('uploadFile'), (req, res) => {
    if(!req.files) {
        res.status(400).send({message : "File was not found"});
        return;
    }
    res.status(200).send({
        message: "success",
        fileInfo: req.files
    })
})

router.put('/', (req, res) => {
    var boardid = req.body.boardid
    var board_sql = `UPDATE board SET title='${req.body.title}', content='${req.body.content}', tag='${req.body.tag}' WHERE board_ID = '${boardid}'`
    var img = req.body.image
    var filename
    var img_sql = `SELECT filename FROM image WHERE board_ID = '${boardid}'`
    var img_del = `DELETE FROM image WHERE board_ID = '${boardid}'`
    var img_ins = `INSERT INTO image (board_ID, filename) VALUES (?, ?)`

    db.query(board_sql, (err, result) => {
        if (err) throw err
        if (img) {
            db.query(img_sql, (err, result) => {
                if (img.includes(',')) {
                    db.query('UPDATE board SET multiple=1 WHERE board_ID=?', boardid, (err, result) => { if (err) throw err})
                    filename = img.split(',')
                    db.query(img_del, (err, result) => { if (err) throw err })
                    for (let i = 0; i < filename.length; i++) {
                        db.query(img_ins, [boardid, filename[i]], (err, result) => {
                            if (err) throw err
                        })
                    }
                } else {
                    db.query('UPDATE board SET multiple=0 WHERE board_ID=?', boardid, (err, result) => { if (err) throw err})
                    db.query(img_del, (err, result) => { if (err) throw err })
                    db.query(img_ins, [boardid, img], (err, result) => { if (err) throw err })
                }
            })
        }
        res.status(200).send()
    })
})

router.delete('/', (req, res) => {
    var board_sql = `DELETE FROM board WHERE board_ID = '${req.query.boardid}'`
    var img_sql = `DELETE FROM image WHERE board_ID = '${req.query.boardid}'`

    db.query(board_sql, (err, result) => {
        if (err) throw err
        db.query(img_sql, (err, result) => {
            if (err) throw err
            res.status(200).send()
        })
    })
})


module.exports = router