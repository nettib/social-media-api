import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    fileName: { type: String, required: true, trim: true },
    originalName: { type: String, required: true, trim: true },
    url: { type: String, required: true },
    size: { type: Number, required: true },
    fileType: { type: String, required: true },
    uploadedAt: { type: Date, default: Date.now() }
})


const postSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        trim: true,
        validate: {
            validator: function(value) {
                return ((value && value.trim().length > 0) || (this.files && this.files.length > 0))
            }
        }
    },
    files: {
        type: [ { type: fileSchema } ],
        default: []
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