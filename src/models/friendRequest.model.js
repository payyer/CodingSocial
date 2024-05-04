const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "FriendRequest";
const COLLECTION_NAME = "FriendRequests";

// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    receiver_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    status: {
        type: String,
        default: "pending" // accepted and rejected
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);