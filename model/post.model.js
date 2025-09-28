import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: [true, "Please provide post content"],
        trim: true,
        minLength: 1
    },
    likes: {
        type: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
        default: []
    },
    comments: {
        type: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }  ],
        default: []
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

postSchema.index({ author: 1 });

const Post = mongoose.model("Post", postSchema);

export default Post;