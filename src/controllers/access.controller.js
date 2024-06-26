const { CREATED, SuccessResponse, LOGIN } = require("../core/success.response")
const AccessService = require("../services/access.service")


class AccessController {
    signUp = async (req, res, next) => {
        console.log(`P::[signUP]::`, req.body)

        new CREATED({
            metadata: await AccessService.signUp(req.body)
        }).send(res)
    }

    login = async (req, res, next) => {
        new LOGIN({
            message: "Login success!",
            metadata: await AccessService.login(req.body)
        }).send(res)
    }

    logout = async (req, res, next) => {
        new SuccessResponse({
            message: "Logout success!",
            metadata: await AccessService.logout(req.keyStore)
        }).send(res)
    }
    handlerRefreshToken = async (req, res, next) => {
        new SuccessResponse({
            message: "Token refreshed successfully",
            metadata: await AccessService.handlerRefreshToken(req.refreshToken)
        }).send(res)
    }
    verifyEmailForUser = async (req, res, next) => {
        new SuccessResponse({
            message: "Verify your email successfull",
            metadata: await AccessService.verifyEmailForUser(req.params)
        }).send(res)
    }
}

module.exports = new AccessController()