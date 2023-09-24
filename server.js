// Main File

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = require('./routers/router')


// server runs at port 8000
const port = 8000


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', router)

app.post('/login', router)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})



