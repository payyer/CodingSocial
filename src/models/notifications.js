const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "Notification";
const COLLECTION_NAME = "Notifications";

// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    sender_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    // post_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Post",
    // },
    // group_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Group",
    // },
    // job_id: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: "Job",
    // },
    notify_type: {
        type: String, // post, like, friendRequest, job, group, message, comment, ...
        required: true,
    },
    notify_content: {
        type: String,
        required: true,
    },
    notify_read: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);