const express = require('express')
const postgresDBModule = require('../database_API/dbapi')
const router = express.Router()
const jwt = require('jsonwebtoken')
const checkLogin = require('../check/login')


// get all users data
router.get('/getUsers/', (req, res, next) => {
    // check token here
    next()
}
    , (req, res, next) => {
        try {
            postgresDBModule.query(`select * from "Users"`, (err, qRes) => {
                res.status(200).json({
                    'data': res.data.rows,
                    'message': 'get data successfully!'
                })
            })
        }
        catch (err) {
            res.status(500).json({
                'error': err,
                'message': 'get failed'
            })
        }
    })

// test login
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


//register
router.post('/register/',
    // middleware check if username has already existed
    (req, res, next) => {
        let username = req.body.username
        try {
            postgresDBModule.query(`select * from "Users" where username = '${username}'`, (err, qRes) => {
                if (qRes.rowCount !== 0) {
                    res.status(400).json({
                        'message': 'Username has already existed'
                    })
                }
            })
        }
        catch (err) {
            res.status(500).json({
                'error': err,
                'message': 'get failed'
            })
        }
    },
    // create new account
    (req, res, next) => {   
        try {
            let password = req.body.password
            postgresDBModule.query(`insert into "Users" values ('${username}', '${password}')`)
            res.status(200).json({
                'message': 'created'
            })
        }
        catch (err) {
            res.status(500).json({
                'err': err,
                'message': 'get failed'
            })
        }
    })
module.exports = router
