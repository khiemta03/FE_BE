const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path');

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}
app.use(cors(corsOptions))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
})

// server runs at port 80
const port = 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
