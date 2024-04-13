const { ForbiddenError } = require("../core/error.reponse")
const ApiKeyService = require("../services/apiKey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    BEARER: 'bearer'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        if (!key) {
            return res.status(403).json({
                message: 'Forbidden Error!'
            })
        }

        const apiKey = await ApiKeyService.findById(key)
        if (!apiKey) {
            return res.status(403).json({
                message: 'Forbidden Error!'
            })
        }
        req.apiKey = apiKey
        return next()
    } catch (error) {
        return error.message
    }

}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.apiKey.permissions) throw new ForbiddenError("Permission denied")
        console.log('permission:: ', req.apiKey.permissions)

        const validPermissions = req.apiKey.permissions.includes(permission)
        if (!validPermissions) throw new ForbiddenError("Permission denied")

        return next()
    }
}

module.exports = { apiKey, permission }