const AccessService = require("../services/access.service")

class AccessController {
    signUp = async (req, res, next) => {
        try {
            console.log(`P::[signUP]::`, req.body)
            res.status(201).json(await AccessService.signUp(req.body))
        } catch (error) {
            console.log(error.message)
        }
    }
}

module.exports = new AccessController()