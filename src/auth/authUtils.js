const JWT = require('jsonwebtoken')
const { ForbiddenError, NotFoundError, UnAuthorizedError } = require('../core/error.reponse')
const KeyTokenService = require('../services/keyToken.service')
const { asyncHandle } = require('../helpers/asyncHandler')

const HEADER = {
    API_KEY: 'x-api-key',
    BEARER: 'bearer',
    USER_CLIENT_ID: 'user-id'
}

const createTokenPair = async (payload, privateKey, publicKey) => {
    try {
        // Create accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: "2 days"
        })

        // Create refresToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days"
        })

        // Check token verify
        JWT.verify(accessToken, publicKey, (error, decoded) => {
            if (error) {
                console.error("error verify::", error);
            } else {
                console.log("decode verify::", decoded);
            }
        });

        return { accessToken, refreshToken }
    } catch (error) {
        console.log(err.message)
        return err.message
    }
}
const authentication = asyncHandle(async (req, res, next) => {
    const userId = req.headers[HEADER.USER_CLIENT_ID]
    if (!userId) throw new ForbiddenError("Invalid User Id Request")

    const keyStore = await KeyTokenService.findByUserId(userId)
    if (!keyStore) throw new NotFoundError("Not Found Key Store!")

    const accessToken = req.headers[HEADER.BEARER]
    if (!accessToken) throw new ForbiddenError("Invalid AccessToken")

    try {
        // 5 -Check KeyStore with this user ID
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey, (error, decoded) => {
            if (error) throw new ForbiddenError("Invalid Token")
            return decoded
        })

        if (userId != decodeUser.userId) throw new UnAuthorizedError("Invalid User")
        req.keyStore = keyStore
        return next()

    } catch (error) {
        throw error
    }

})


module.exports = { createTokenPair, authentication }