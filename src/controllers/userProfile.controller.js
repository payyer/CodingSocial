const { SuccessResponse } = require("../core/success.response")
const UserService = require("../services/user.service")

class UserController {
    updateViewProfile = async (req, res, next) => {
        new SuccessResponse({
            message: "Update view successfull!",
            metadata: await UserService.updateViewProfile({
                userId: req.user.userId,
                body: req.body
            })
        }).send(res)
    }

    updateDetailProfile = async (req, res, next) => {
        new SuccessResponse({
            message: "Update profile successfull!",
            metadata: await UserService.updateDetailProfile({
                userId: req.user.userId,
                body: req.body
            })
        }).send(res)
    }

    updateAvatar = async (req, res, next) => {
        new SuccessResponse({
            message: "Update Avatar successfull!",
            metadata: await UserService.updateAvatar({
                userId: req.user.userId,
                avatar: req.file
            })
        }).send(res)
    }
}

module.exports = new UserController()