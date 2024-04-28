const express = require("express")
const morgan = require("morgan")
const compression = require("compression")
const cors = require('cors')
const helmet = require("helmet")
const app = express()
var cookieParser = require('cookie-parser')

// ----- Init middleware -----
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }))
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// -------- Init DB ----------
require('./db/init.mongodb')
const { checkOverload } = require("./helpers/check.connect")
checkOverload()

// ------ Init routes --------
app.use("", require('./routes/index'))


// ----- Handling error ------
app.use((req, res, next) => {
    const error = new Error('Not Found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    // Nếu không bắt được lỗi thì trả về 500
    const statusCode = error.status || 500
    return res.status(statusCode).json({
        status: 'error',
        code: statusCode,
        message: error.message || 'Internal Server Error'
    })
})



module.exports = app