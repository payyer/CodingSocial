const { SuccessResponse } = require("../core/success.response")
const UserService = require("../services/user.service")

class UserController {
    updateViewProfile = async (req, res, next) => {
        new SuccessResponse({
            message: "Update successfull!",
            metadata: await UserService.updateViewProfile({
                userId: req.user.userId,
                body: req.body
            })
        }).send(res)
    }
}

module.exports = new UserController()