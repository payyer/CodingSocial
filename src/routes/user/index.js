const express = require('express')
const multer = require('multer')

const { authentication } = require('../../auth/authUtils')
const { asyncHandle } = require('../../helpers/asyncHandler')

const UserController = require('../../controllers/userProfile.controller')
const upload = multer({ dest: 'uploads/' })
const router = express.Router()

router.use(authentication)
router.get('/getAllFriendRequest', asyncHandle(UserController.getAllFriendRequest))
router.put('/view', asyncHandle(UserController.updateViewProfile))
router.put('/profile', asyncHandle(UserController.updateDetailProfile))
router.put('/avatar', upload.single('avatar'), asyncHandle(UserController.updateAvatar))
router.put('/cv', upload.single('cv'), asyncHandle(UserController.updateCV))
router.post('/sendFriendRequest', asyncHandle(UserController.sendFriendRequest))
router.put('/acceptFriendRequest', asyncHandle(UserController.acceptFriendRequest))
router.put('/rejectFriendRequest', asyncHandle(UserController.rejectFriendRequest))
router.put('/unfriend', asyncHandle(UserController.unfriend))

module.exports = router