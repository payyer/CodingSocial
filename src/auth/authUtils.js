const JWT = require('jsonwebtoken')

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

module.exports = { createTokenPair }