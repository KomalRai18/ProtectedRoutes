import User from '../models/User.js'
import jwt from 'jsonwebtoken'

export async function VerifyJWT(req,res, next){
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1]
    console.log("req header os ",req)
    if(!token) return res.status(401).json({message: "Unauthorized"})
    const decoded = jwt.verify(token, "SECRET-KEY")
    const user = await User.findById(decoded.id)
    if(!user) return res.status(404).json({message: "User not found"})
        req.user = decoded
    next()
}