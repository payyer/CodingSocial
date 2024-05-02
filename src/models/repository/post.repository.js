const postModel = require("../post.model")

class PostRepository {
    createNewPost = async (userId, body, media) => {
        return await postModel.create({
            user_id: userId,
            from_group: body.from_group,
            post_content: body.post_content,
            post_media: media ? media : null
        })
    }
}

module.exports = new PostRepository()