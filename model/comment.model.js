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
     }
}, { timestamps: true });


const Comment = mongoose.model("Comment", commentSchema);

export default Comment;