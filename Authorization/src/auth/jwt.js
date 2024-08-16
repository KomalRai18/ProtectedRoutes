import jwt from 'jsonwebtoken'
const SECRET = "SECRET-KEY"
const miliSeconds = 24*60*60*1000;

export function setToken(user){
    const token =  jwt.sign({
        email: user.email,
        id: user._id,
        fullname: user.fullname,
        role: user.role
    },SECRET, {
        expiresIn: Math.floor(Math.random() * miliSeconds ),
    });
    return token
}
