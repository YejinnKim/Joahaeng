const express = require('express')
const router = express.Router()
const path = require('path')
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
    var board_sql = `SELECT * FROM board ORDER BY board_ID DESC`
    var image_sql = `SELECT board_ID, filename FROM image`

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
        res.render('board_write', {page: '여행 후기 작성', user: user})
    }
})

router.post('/write', (req, res) => {
    var data = `'${req.session.user.id}', '${req.body.location}', '${req.body.content}', '${req.body.tag}'`
    var board_sql = `INSERT INTO board (user_ID, place_ID, content, tag) VALUES (${data})`
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


module.exports = router