const express = require("express")
const { apiKey, permission } = require("../auth/checkAuth")
const router = express.Router()

// Check API Key
router.use(apiKey)

//Check Permission
router.use(permission('0000'))

router.use('/v1/api', require('./access'))
router.use('/v1/api/user', require('./user'))
router.use('/v1/api/post', require('./post'))

module.exports = router