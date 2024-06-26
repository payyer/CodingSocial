const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "Post";
const COLLECTION_NAME = "Posts";

// Declare the Schema of the Mongo model
var postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    from_group: {
        type: String,
    },
    post_media: [
        {
            public_id: { type: String },
            secure_url: { type: String },
            resource_type: { type: String }
        }
    ],
    post_content: {
        type: String,
    },
    post_emoji: {
        type: Number,
        default: 0
    },
    post_shared: {
        type: Number,
        default: 0
    },
    post_type: {
        type: String,
        default: 'Public' // Private or Friend
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, postSchema);