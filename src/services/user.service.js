const userModel = require("../models/user.model")

class UserService {
    static findByEmail = async ({ email }, select = {
        user_email: 1, user_password: 1, user_name: 1, user_roles: 1, user_verify: 1
    }) => {
        return await userModel.findOne({ user_email: email }).select(select).lean()
    }
}

module.exports = UserService