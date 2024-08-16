import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
    fullname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        minLength: true,
    },
    role:{
        type: String,
        enum: ["user", "admin"],
        default: "user" 
    }
})
const User = mongoose.model('newusers', UserSchema)
export default User
