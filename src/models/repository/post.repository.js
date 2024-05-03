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

    increaseLike = async (postId) => {
        return await postModel.findByIdAndUpdate(
            { _id: postId },
            { $inc: { post_emoji: 1 } },
            { new: true }
        ).select({ post_emoji: 1, _id: 0 })
    }

    decreaseLike = async (postId) => {
        return await postModel.findByIdAndUpdate(
            { _id: postId },
            { $inc: { post_emoji: -1 } },
            { new: true }
        ).select({ post_emoji: 1, _id: 0 })
    }

}

module.exports = new PostRepository()