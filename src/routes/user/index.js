const express = require('express')
const { authentication } = require('../../auth/authUtils')
const { asyncHandle } = require('../../helpers/asyncHandler')
const UserController = require('../../controllers/userProfile.controller')
const router = express.Router()

router.use(authentication)
router.put('/view', asyncHandle(UserController.updateViewProfile))

module.exports = router