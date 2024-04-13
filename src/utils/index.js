const _ = require('lodash')

// Hàm chung để lọc ra các fields cần trả về
const getInfoData = ({ fields = [], object = {} }) => {
    return _.pick(object, fields);
};

module.exports = { getInfoData }