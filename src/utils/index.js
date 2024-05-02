const _ = require('lodash')
const cloudianry = require('./cloudinary')
// Hàm chung để lọc ra các fields cần trả về
const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
};

// Generate random 6 number verification token 
const generateVerificationToken = () => {
    return Math.floor(100000 + Math.random() * 900000);
}

const uploadFile = async (files) => {
    return await Promise.all(
        files.map(async (file) => {
            const { public_id, secure_url, resource_type } = await cloudianry.uploader.upload(file.path, {
                resource_type: 'auto', folder: 'SocialMedia'
            });
            return { public_id, secure_url, resource_type }
        })
    );
}


module.exports = { getInfoData, generateVerificationToken, uploadFile }