const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = "Post_Like";
const COLLECTION_NAME = "Post_Likes";

// Declare the Schema of the Mongo model
var post_likeSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User",
    },
    post_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "Post"
    }
}, {
    timestamps: true,
    collection: COLLECTION_NAME
});

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, post_likeSchema);