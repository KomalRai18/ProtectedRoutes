import { Comment } from "../models/comment.js";
export async function handlePostComments(req,res){
    const {title, comment} = req.body;
    const payload = await Comment.create({title, comment});
    if(!payload) {return res.status(400).json({msg: "Error occured"})}
    console.log(req)
    return res.status(200).json({msg: "Comment Recieved"});
}
export async function handleGetComments(req,res) {
    const payload = await Comment.find({});
    if(!payload) {return res.status(202).json({msg:"No Comments"})}
    return res.status(200).json(payload)
}
