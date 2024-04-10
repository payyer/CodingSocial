const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "User";
const COLLECTION_NAME = "Users";

// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        index: true,
        trim: true,
        maxLength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    verifyEmail: {
        type: Boolean,
        default: false,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: false,
        default: null
    },
    region: {
        type: String,
        required: false,
        default: null
    },
    city: {
        type: String,
        required: false,
        default: null
    },
    address: {
        type: String,
        required: false,
        default: null
    },
    roles: {
        type: Array,
        default: [],
    },
}, {
    timeseries: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, userSchema)