const userModel = require("../user.model")

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

module.exports = { updateViewProfileById }