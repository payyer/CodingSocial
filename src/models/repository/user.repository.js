const userModel = require("../user.model")

const findUserById = async (userId) => {
    return await userModel.findById(userId)
}

const updateViewProfileById = async (userId, body, isNew = true) => {
    const displayUpdate = body.user_display_settings
    const filter = { _id: userId }
    const update = {
        user_display_settings: {
            user_email: displayUpdate.user_email,
            user_bio: displayUpdate.user_bio,
            user_cv: displayUpdate.user_cv,
            user_company: displayUpdate.user_company,
            user_birthday: displayUpdate.user_birthday,
            user_address: displayUpdate.user_address,
            user_city: displayUpdate.user_city,
            user_country: displayUpdate.user_country,
            user_list_friend: displayUpdate.user_list_friend,
        }
    }
    const select = { user_display_settings: 1 }
    return await userModel.findOneAndUpdate(filter, update, { new: isNew }).select(select).lean()
}

const updateDetailProfileById = async (userId, body, isNew = true) => {
    // body are fields update
    const filter = { _id: userId }
    const update = {
        user_name: body.user_name,
        user_company: body.user_company,
        user_bio: body.user_bio,
        user_cv: body.user_cv,
        user_birthday: body.user_birthday,
        user_address: body.user_address,
        user_city: body.user_city,
        user_country: body.user_country,
    }
    const select = {
        user_name: 1, user_bio: 1,
        user_birthday: 1, user_address: 1, user_city: 1,
        user_country: 1, user_company: 1
    }
    return await userModel.findOneAndUpdate(filter, update, { new: isNew }).select(select).lean()
}

const updateUserAvatarById = async (userId, result, isNew = true) => {
    const filter = { _id: userId }
    const update = {
        user_avatar: {
            public_id: result.public_id,
            url: result.secure_url
        }
    }
    const select = { user_avatar: 1 }
    return await userModel.findOneAndUpdate(filter, update, { new: isNew }).select(select).lean()
}

module.exports = { updateViewProfileById, updateDetailProfileById, updateUserAvatarById, findUserById }