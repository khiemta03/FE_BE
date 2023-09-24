const express = require('express')
const postgresDBModule = require('../database_API/dbapi')
const router = express.Router()
const jwt = require('jsonwebtoken')
const checkLogin = require('../check/login')


// login
const signature = 'Duy Khiem'
router.post('/login/', checkLogin,
    (req, res, next) => {
        // create a token
        const token = jwt.sign({ username: req.body.username }, signature)

        res.json({
            'token': token,
            'message': 'login successfully!'
        })
        console.log(req.body.username + " logged in")
    }
)


// register
router.post('/register/',
    // middleware check if username has already existed
    (req, res, next) => {
        postgresDBModule.query(`select * from "Users" where username = '${req.body.username}'`, (err, qRes) => {
            if (err) {
                res.status(500).json({
                    'error': err,
                    'message': 'get failed'
                })
            }
            if (qRes.rowCount !== 0) {
                res.status(400).json({
                    'message': 'Username has already existed'
                })
            }
            next()
        })
    },
    // create new account
    (req, res, next) => {
        let password = req.body.password
        postgresDBModule.query(`insert into "Users" values ('${req.body.username}', '${req.body.password}')`, (err, qRes) => {
            if (err) {
                res.status(500).json({
                    'err': err,
                    'message': 'get failed'
                })
            }
            res.status(200).json({
                'message': 'created'
            })
        })
    })
module.exports = router
