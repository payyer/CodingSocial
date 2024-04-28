const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { getInfoData, generateVerificationToken } = require('../utils');
const { ConflictError, BadRequestError, NotFoundError, UnAuthorizedError, ForbiddenError } = require('../core/error.reponse');
const UserService = require('./user.service');
const { createTokenPair, verifyJWT } = require('../auth/authUtils');
const EmailService = require('./email.service');
const RoleUser = {
    ADMIN: "ADMIN",
    USER: "USER",
};

class AccessService {
    static login = async ({ email, password }) => {
        // Check email in dbs
        const user = await UserService.findByEmail({ email })
        if (!user) throw new NotFoundError("Email not found!")

        // Compare password
        const matchPassword = bcrypt.compareSync(password, user.user_password)
        if (!matchPassword) throw new UnAuthorizedError("Password incorrect!")

        if (!user.user_verify) throw new ForbiddenError("Email is not verified")

        // Create accesstoken and refrestoken
        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        // Generate tokens
        // Give this token pair for client
        const tokens = await createTokenPair(
            { userId: user._id, email },
            privateKey,
            publicKey
        )

        //  Save token pair to dbs
        await KeyTokenService.createKeyToken({
            userId: user._id,
            privateKey,
            publicKey,
            refreshToken: tokens.refreshToken
        })

        return {
            user: getInfoData({
                fields: ["_id", "user_name", "user_email"],
                object: user
            }),
            tokens
        }
    }

    static signUp = async ({ name, email, password }) => {
        // try {
        // Check email is exsit ?
        const holderUser = await userModel.findOne({ user_email: email }).lean() // lean để tăng tốc độ , giảm size trả về
        if (holderUser) throw new ConflictError("User already exist!")

        const passwordHash = bcrypt.hashSync(password, 10)

        const newUser = await userModel.create({
            user_name: name,
            user_email: email,
            user_password: passwordHash,
            user_roles: RoleUser.USER,
            email_verify_token: generateVerificationToken()
        });

        // If create user success
        if (newUser) {

            await EmailService.sendEmail(newUser.user_email, newUser.email_verify_token)

            //Create PrivateKey and PublicKey
            const privateKey = crypto.randomBytes(60).toString('hex')
            const publicKey = crypto.randomBytes(60).toString('hex')

            console.log({ privateKey }, { publicKey });

            // Create Token send to client
            const tokens = await createTokenPair({ userId: newUser._id, email, role: newUser.user_roles }, privateKey, publicKey);
            console.log("Created Token Success: ", tokens);
            // Save collection keyStore
            const keyStore = await KeyTokenService.createKeyToken({
                userId: newUser._id,
                privateKey, publicKey,
                refreshToken: tokens.refreshToken
            })
            console.log({ keyStore });

            if (!keyStore) throw new BadRequestError("Can't create Key store")
            return {
                user: getInfoData({
                    fields: ["_id", "user_name", "user_email"],
                    object: newUser
                }),
                tokens
            }
        }
        return {
            code: 400,
            metadata: null,
        };
    }

    static logout = async (keyStore) => {
        const delKey = KeyTokenService.deleteById(keyStore._id)
        console.log(delKey)
        return delKey
    }

    static handlerRefreshToken = async ({ refreshToken }) => {
        // Check this token was use?
        const foundToken = await KeyTokenService.findByRefreshTokenUsed(refreshToken)
        // if refreshToken is exsit in dbs?
        // delete keyStore
        if (foundToken) {
            // decoded refresh token JWT to get userId and email
            const { userId, email } = await verifyJWT(refreshToken, foundToken.privateKey)
            await KeyTokenService.deleteByUserId(userId)
            throw new ForbiddenError("Something wrong! Please relogin")
        }

        // check refesh token is exist? 
        const holderToken = await KeyTokenService.findByRefreshToken(refreshToken)
        if (!holderToken) throw new NotFoundError("Note found User match with refresh token")

        const { userId, email } = await verifyJWT(refreshToken, holderToken.privateKey)
        // check user is exist?
        const foundUser = await UserService.findByEmail({ email });
        if (!foundUser) throw new NotFoundError("User doesn't exits")

        // create Token pair
        const tokens = await createTokenPair({ userId, email }, holderToken.privateKey, holderToken.publicKey);

        // update token
        await holderToken.updateOne({
            $set: {
                refreshToken: tokens.refreshToken // update new refreshToken for user
            },
            $addToSet: {
                refeshTokensUsed: refreshToken // add old refreshToken to list refreshTokenUsed
            }
        })

        return {
            user: { userId, email },
            tokens
        }
    }

    static verifyEmailForUser = async ({ verifyCode }) => {
        const filter = { email_verify_token: verifyCode }
        const update = {
            user_verify: true,
            email_verify_token: generateVerificationToken() // tạo mới verify code
        }
        const foundUser = await userModel.findOneAndUpdate(filter, update, { new: true }).lean()
        if (!foundUser) throw new BadRequestError("Invalid verification code")

        return {
            verify: "Successfully!"
        }
    }
}

module.exports = AccessService