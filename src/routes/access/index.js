const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandle } = require("../../helpers/asyncHandler");
const { authentication } = require("../../auth/authUtils");
const router = express.Router()

// signUp
router.post('/user/login', asyncHandle(accessController.login))
router.post('/user/signup', asyncHandle(accessController.signUp))

// Authentication
router.use(authentication)

router.delete('/user/logout', asyncHandle(accessController.logout))

module.exports = router;