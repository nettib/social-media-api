import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    postId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Post",
        required: true
     },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        required: [true, "Please provide comment content"],
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
    }
}, { timestamps: true });

commentSchema.pre("save", function(next) {
    this.likesCount = this.likes.length;
    next();
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;