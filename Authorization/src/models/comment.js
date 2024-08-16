import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
    title:{
        type: String,
    },
    comment:{
        type:String,
    }
})
export const Comment = mongoose.model("commentdbs", CommentSchema)
