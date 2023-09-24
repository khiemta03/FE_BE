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
router.post('/register', (req, res, next) => {

})
module.exports = router
