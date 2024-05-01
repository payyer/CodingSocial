const { BadRequestError, ForbiddenError } = require("../core/error.reponse")
const { updateViewProfileById, updateDetailProfileById, updateUserAvatarById, findUserById } = require("../models/repository/user.repository")
const userModel = require("../models/user.model")
const cloudinary = require("../utils/cloudinary")

class UserService {
    static findByEmail = async ({ email }, select = {
        user_email: 1, user_password: 1, user_name: 1, user_roles: 1, user_verify: 1
    }) => {
        return await userModel.findOne({ user_email: email }).select(select).lean()
    }

    // Chế độ ẩn, hiện của thông tin cá nhân
    static updateViewProfile = async ({ userId, body }) => {
        return await updateViewProfileById(userId, body)
    }
    static updateDetailProfile = async ({ userId, body }) => {
        return await updateDetailProfileById(userId, body)
    }

    static updateAvatar = async ({ userId, avatar }) => {
        const foundUser = await findUserById(userId)
        if (!foundUser) throw new ForbiddenError("You don't have permission to change another user's avatar.")

        // Note: Need delete old avatar before update new Avatar for user
        if (foundUser.user_avatar.public_id) {
            cloudinary.uploader.destroy(foundUser.user_avatar.public_id)
                .then(result => console.log("Delete image on cloud", result))
                .catch(error => console.log("Delete Image Error", error))
        }

        const result = await cloudinary.uploader.upload(avatar.path, {
            folder: 'SocialMedia'
        })



        return await updateUserAvatarById(userId, result)
    }
}

module.exports = UserService