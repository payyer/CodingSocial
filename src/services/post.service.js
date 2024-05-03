const { NotFoundError } = require("../core/error.reponse")
const postModel = require("../models/post.model")
const post_likesModel = require("../models/post_likes.model")
const postRepository = require("../models/repository/post.repository")
const { uploadFile, getInfoData } = require("../utils")
class PostService {

    static createPost = async ({ userId, body, files }) => {
        // Kiểm tra có ảnh hoặc video ko
        let media = []
        if (files && files.length > 0) {
            media = await uploadFile(files)
        }
        return await postRepository.createNewPost(userId, body, media)
    }

    static increaseOrDecreaseLike = async ({ userId, postId }) => {
        const postFound = await postModel.findById(postId)
        if (!postFound) throw new NotFoundError("Don't found posts")

        // Kiểm tra người dũng lã like bài post chưa
        // Nếu đã like => xóa lượt like, giảm lượt emoji của bài post
        const existingLike = await post_likesModel.findOneAndDelete({ post_id: postId, user_id: userId })
        if (existingLike) {
            const likeCount = await postRepository.decreaseLike(postId)
            return { AfterDecrease: likeCount }
        } else {
            // Nếu chưa like => tạo mới bảng post_like, tăng lượt emoji của bài post
            const postLike = await post_likesModel.create({
                post_id: postId,
                user_id: userId
            })
            const likeCount = await postRepository.increaseLike(postId)
            return {
                newPostLike: getInfoData({
                    fields: ['user_id', 'post_id'],
                    object: postLike
                }),
                AfterIncrease: likeCount
            }
        }
    }
}

module.exports = PostService