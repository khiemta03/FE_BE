const jwt = require('jsonwebtoken')
const postgresDBModule = require('../database_API/dbapi')
const checkLogin = require('./login')

let signature = 'Duy Khiem'
checkAdmin = (req, res, next) => {
    // get token
    let _token = req.body.token

    let username = jwt.verify(_token, signature).username

    postgresDBModule.query(`select role from "Users" where username = '${username}'`, (err, qRes) => {
        if (err) {
            res.status(500).json({
                'error': err,
                'message': 'get failed'
            })
        }
        console.log(qRes.rows[0].role )
        if (qRes.rows[0].role === 'admin') {
            next()
        } else {
            console.log('not permission')
            res.json({
                'message': 'not permission'
            })
        }
    })

}

module.exports = checkAdmin