import mongoose from "mongoose";


const UserSchema= new mongoose.Schema({
    name: String,
    email: {
        type: String,
        // required: true,
        unique: true
    },
    password: {
        type: String,
        // required: true
    },
    role : {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    githubId: {
        type: String,
        unique: true,
    },
    googleId: {
        type: String,
        unique: true,
    }
}, {
    timestamps: true
});


const User = mongoose.model("User",UserSchema);

export default User;