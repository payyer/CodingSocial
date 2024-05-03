const express = require('express')
const multer = require('multer')
const { authentication } = require('../../auth/authUtils')
const { asyncHandle } = require('../../helpers/asyncHandler')
const postController = require('../../controllers/post.controller')
const upload = multer({ dest: 'uploads' })
const router = express.Router()

router.use(authentication)

router.post('/create', upload.array('files'), asyncHandle(postController.createPost))
router.put('/like/:postId', asyncHandle(postController.increaseOrDecreaseLike))


module.exports = router