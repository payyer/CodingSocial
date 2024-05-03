const { SuccessResponse } = require("../core/success.response")
const PostService = require("../services/post.service")

class PostController {
    createPost = async (req, res, next) => {
        new SuccessResponse({
            message: "Create new post successfully!",
            metadata: await PostService.createPost({
                userId: req.user.userId,
                body: req.body,
                files: req.files
            })
        }).send(res)
    }

    increaseOrDecreaseLike = async (req, res, next) => {
        new SuccessResponse({
            message: "Update post like successfully!",
            metadata: await PostService.increaseOrDecreaseLike({
                userId: req.user.userId,
                postId: req.params.postId
            })
        }).send(res)
    }

}

module.exports = new PostController()