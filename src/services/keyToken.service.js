const { default: mongoose } = require('mongoose')
const keyTokenModel = require('../models/keytoken.model')

class KeyTokenService {
    static createKeyToken = async ({ userId, privateKey, publicKey, refreshToken }) => {
        try {
            // filter in dbs document has user = userId
            const filter = { user: userId }
            const update = { publicKey, privateKey, refeshTokensUsed: [], refreshToken }
            // upsert: if don't have document match with filter, mongooser will create new document
            // new will return document list after process
            const option = { upsert: true, new: true }
            const tokens = await keyTokenModel.findOneAndUpdate(filter, update, option)
            console.log({ tokens })
            return tokens ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }

    static findByUserId = async (userId) => {
        return await keyTokenModel.findOne({ user: new mongoose.Types.ObjectId(userId) }).lean()
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keyTokenModel.findOne({ refeshTokensUsed: refreshToken }).lean()
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keyTokenModel.findOne({ refreshToken: refreshToken })
    }

    static deleteById = async (id) => {
        return await keyTokenModel.deleteOne(id)
    }

    static deleteByUserId = async (userId) => {
        return await keyTokenModel.deleteOne({ user: new mongoose.Types.ObjectId(userId) })
    }
}

module.exports = KeyTokenService