const _ = require('lodash')

// Hàm chung để lọc ra các fields cần trả về
const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
};

// Generate random 6 number verification token 
const generateVerificationToken = () => {
    return Math.floor(100000 + Math.random() * 900000);
}



module.exports = { getInfoData, generateVerificationToken }