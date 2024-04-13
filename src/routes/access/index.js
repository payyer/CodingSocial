const express = require("express");
const accessController = require("../../controllers/access.controller");
const { asyncHandle } = require("../../helpers/asyncHandler");
const router = express.Router()

// signUp
router.post('/user/signup', asyncHandle(accessController.signUp))

module.exports = router;