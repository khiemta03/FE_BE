
const express = require('express')
const postgresDBModule = require('../database_API/dbapi')
const router = express.Router()


// get all users data
router.get('/users/',
    (req, res, next) => {
        postgresDBModule.query(`select * from "Users"`, (err, qRes) => {
            if (err) {
                res.status(500).json({
                    'error': err,
                    'message': 'get failed'
                })
            }
            res.status(200).json({
                'data': qRes.rows,
                'message': 'get data successfully!'
            })
        })
    })

module.exports = router