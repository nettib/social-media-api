import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        minLength: 1,
        maxLength: 100
    },
    username: {
        type: String,
        required: [true, "Please provide a username"],
        trim: true,
        lowercase: true,
        match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"]
    }, 
    email: {
        type: String,
        required:[true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Please provide a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 6
    },
    bio: {
        type: String,
        maxLength: 200,
        default: ""
    },
    followers: { 
        type: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
        default: []
    }, 
    following: { 
        type: [ { type: mongoose.Schema.Types.ObjectId, ref: "User" } ],
        default: []
    }
}, { timestamps: true });

UserSchema.index({ username: 1 });

const User = mongoose.model("User", UserSchema);

export default User;
