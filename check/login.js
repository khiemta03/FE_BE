
const postgresDBModule = require('../database_API/dbapi')


const checkLogin = (req, res, next) => {
    let userName = req.body.username
    let password = req.body.password
    console.log("Client sent: ",
        {
            "Username": userName,
            "Password": password
        }
    )
    postgresDBModule.query(`select * from "Users" where username = '${userName}' and password = '${password}'`,
        (err, data) => {
            if (err) {
                console.log(err.message)
                res.status(500).json('Cannot connect to db')
            }
            if (data.rowCount !== 0) {
                res.data = data.rows
                next()
            } else {
                console.log('Request failed!')
                res.status(400).json('Request failed')
            }
        })
}




module.exports = checkLogin