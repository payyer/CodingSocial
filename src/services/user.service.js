const { updateViewProfileById } = require("../models/repository/user.repository")
const userModel = require("../models/user.model")

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
}

module.exports = UserService