const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { getInforData } = require('../utils');
const { createTokens } = require('../auth/authUtils');
const { ConflictError, BadRequestError } = require('../core/error.reponse');
const RoleUser = {
    ADMIN: "ADMIN",
    USER: "USER",
};

class AccessService {
    static signUp = async ({ name, email, password }) => {
        // try {
        // Check email is exsit ?
        const holderUser = await userModel.findOne({ email }).lean() // lean để tăng tốc độ , giảm size trả về
        if (holderUser) throw new ConflictError("User already exist!")

        const passwordHash = bcrypt.hashSync(password, 10)
        console.log({ passwordHash })

        const newUser = await userModel.create({
            name,
            email,
            password: passwordHash,
            roles: RoleUser.USER,
        });

        // If create user success
        if (newUser) {
            //Create PrivateKey and PublicKey
            const privateKey = crypto.randomBytes(60).toString('hex')
            const publicKey = crypto.randomBytes(60).toString('hex')

            console.log({ privateKey }, { publicKey });

            // Save collection keyStore
            const keyStore = await KeyTokenService.createKeyToken(newUser._id, privateKey, publicKey)
            console.log({ keyStore });

            if (!keyStore) throw new BadRequestError("Can't create Key store")


            // Create Token send to client
            const tokens = await createTokens({ userId: newUser._id, email }, privateKey, publicKey);
            console.log("Created Token Success: ", tokens);

            return {
                user: getInforData({
                    fields: ["_id", "name", "email"],
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
}

module.exports = AccessService