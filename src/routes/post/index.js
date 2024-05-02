const express = require('express')
const multer = require('multer')
const { authentication } = require('../../auth/authUtils')
const { asyncHandle } = require('../../helpers/asyncHandler')
const postController = require('../../controllers/post.controller')
const upload = multer({ dest: 'uploads' })
const router = express.Router()

router.use(authentication)
router.post('/create', upload.array('files'), asyncHandle(postController.createPost))
// router.put('/profile', asyncHandle(UserController.updateDetailProfile))
// router.put('/avatar', upload.single('avatar'), asyncHandle(UserController.updateAvatar))

module.exports = router