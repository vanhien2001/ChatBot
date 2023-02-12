const express = require('express');
const cors = require('cors')
const app = express()
const db = require('./src/services/db.service');
const Route = require('./src/Route');

db.connect()

app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
//     next();
// });


app.use(cors())

Route(app)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => { console.log(`Server started at port ${PORT}`)})
