// Main File

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const guestRouter = require('./routers/Guest')
const adminRouter = require('./routers/Admin')
const checkAdmin = require('./check/admin')


// server runs at port 8000
const port = 8000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// for guests
app.use('/', guestRouter)
//for admins
app.use('/admin/', checkAdmin, adminRouter)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



