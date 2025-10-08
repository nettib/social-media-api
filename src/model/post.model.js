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
    likesCount: {
        type: Number,
        default: 0
    },
    comments: {
        type: [ { type: mongoose.Schema.Types.ObjectId, ref: "Comment" }  ],
        default: []
    },
    commentsCount: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

postSchema.index({ author: 1 });

postSchema.pre("save", function(next) {
    this.likesCount = this.likes.length
    this.commentsCount = this.comments.length
    next();
});

const Post = mongoose.model("Post", postSchema);

export default Post;