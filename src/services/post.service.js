const { BadRequestError } = require("../core/error.reponse")
const postRepository = require("../models/repository/post.repository")
const { uploadFile } = require("../utils")
const cloudinary = require("../utils/cloudinary")
class PostService {
    // create post
    static createPost = async ({ userId, body, files }) => {
        // Kiểm tra có ảnh hoặc video ko
        // Nếu có thì up ảnh lên cloud
        let media = []
        if (files && files.length > 0) {
            media = await uploadFile(files)
        }

        return await postRepository.createNewPost(userId, body, media)
    }
}

module.exports = PostService