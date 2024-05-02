const JWT = require('jsonwebtoken')
const { ForbiddenError, NotFoundError, UnAuthorizedError } = require('../core/error.reponse')
const KeyTokenService = require('../services/keyToken.service')
const { asyncHandle } = require('../helpers/asyncHandler')

const HEADER = {
    API_KEY: 'x-api-key',
    BEARER: 'bearer',
    USER_CLIENT_ID: 'user-id',
    REFRESH_TOKEN: 'x-refresh-token'
}

const createTokenPair = async (payload, privateKey, publicKey) => {
    try {
        // Create accessToken
        const accessToken = await JWT.sign(payload, publicKey, {
            expiresIn: "2 days" // 1 tiếng nè má
        })

        // Create refresToken
        const refreshToken = await JWT.sign(payload, privateKey, {
            expiresIn: "7 days"
        })

        // Check token verify
        // JWT.verify(accessToken, publicKey, (error, decoded) => {
        //     if (error) {
        //         console.error("error verify::", error);
        //     } else {
        //         console.log("decode verify::", decoded);
        //     }
        // });

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

    if (req.headers[HEADER.REFRESH_TOKEN]) {
        try {
            const refreshToken = req.headers[HEADER.REFRESH_TOKEN]
            const decodedUser = JWT.verify(refreshToken, keyStore.privateKey)
            console.log({ decodedUser })
            // 5 -Check KeyStore with this user ID
            if (userId != decodedUser.userId) throw new AuthFailError("Invalid User")
            req.user = decodedUser
            req.keyStore = keyStore
            req.refreshToken = refreshToken
            return next()
        } catch (error) {
            throw error
        }
    }

    const accessToken = req.headers[HEADER.BEARER]
    if (!accessToken) throw new ForbiddenError("Invalid AccessToken")

    try {
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)
        if (userId != decodeUser.userId) throw new AuthFailError("Invalid User")
        req.keyStore = keyStore
        req.user = decodeUser
        return next()

    } catch (error) {
        throw error
    }

})
const verifyJWT = async (token, publicKey) => {
    return await JWT.verify(token, publicKey)
}

module.exports = { createTokenPair, authentication, verifyJWT }