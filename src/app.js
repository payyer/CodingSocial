const express = require("express")
const morgan = require("morgan")
const compression = require("compression")
const helmet = require("helmet")
const app = express()

// ----- Init middleware -----
app.use(morgan("dev"))
app.use(helmet())
app.use(compression())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// -------- Init DB ----------
require('./db/init.mongodb')
const { checkOverload } = require("./helpers/check.connect")
checkOverload()

// ------ Init routes --------
app.use("", require('./routes/index'))
// ----- Handling error ------

module.exports = app