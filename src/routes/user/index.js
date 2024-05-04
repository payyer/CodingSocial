const express = require('express')
const multer = require('multer')

const { authentication } = require('../../auth/authUtils')
const { asyncHandle } = require('../../helpers/asyncHandler')

const UserController = require('../../controllers/userProfile.controller')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router.use(authentication)
router.put('/view', asyncHandle(UserController.updateViewProfile))
router.put('/profile', asyncHandle(UserController.updateDetailProfile))
router.put('/avatar', upload.single('avatar'), asyncHandle(UserController.updateAvatar))
router.post('/sendFriendRequest', asyncHandle(UserController.sendFriendRequest))

module.exports = router