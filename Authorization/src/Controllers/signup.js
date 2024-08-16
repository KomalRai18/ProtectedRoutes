import bcrypt from 'bcrypt';
import User from '../models/User.js';
import { setToken } from '../auth/jwt.js';
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import {jwtDecode} from 'jwt-decode';



const secret = 'Super@Dooper'
function generateRandomString(length) {
    return crypto.getRandomValues(new Uint8Array(length))
      .reduce((str, byte) => str + String.fromCharCode(byte % 62 + (byte % 62 < 10 ? 48 : byte % 62 < 36 ? 55 : 61)), '');
  }
  
  const token = generateRandomString(16); // Example output: "zY9aKdBmXQ0PlW3D"
  
// Handle SignUp
export async function handleSignUp(req, res) {
    const { fullname, email, password, role } = req.body;

    if (!fullname || !email || !password || !role) {
        return res.status(400).json({ msg: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Email already exists" });

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = await User.create({
            fullname,
            email,
            password: hashedPassword,
            role, // Save the hashed password as 'password'
        });

        const getToken = setToken(user);
        res.cookie("token", getToken);
        return res.status(200).json({ msg: "User created successfully", token: getToken, role: user.role });
    } catch (error) {
        console.error("Error during sign-up:", error); // Log the exact error
        return res.status(500).json({ msg: "An error occurred during sign-up" });
    }
}

// Handle Login
export async function handleLogin(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: "All fields required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ msg: "User not found!" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password); // Corrected argument order
        if (!isPasswordValid) {
            return res.status(401).json({ msg: "Invalid User Credentials" });
        }

        const getToken = setToken(user);
        res.cookie("token", getToken, {
            httpOnly: true,
            maxAge: 60 * 1000 // Adjust as needed
        });

        return res.status(200).json({ msg: "User Logged in successfully", token: getToken, role: user.role });
    } catch (error) {
        console.error("Error during login:", error); // Log the exact error
        return res.status(500).json({ msg: "An error occurred during login" });
    }
}

export async function handleDashboard(req,res){
    res.send("Welcome to Dashboard after Verification!")
}
export async function handleForgotPassword(req,res){
    const {email} = req.body;
    console.log(email)
    if(!email){
        return res.status(400).json({msg: "All fields are required"})
    }
    try {
        const user = await User.findOne({email})
        console.log(user)
        if(!user) {return res.status(400).json({msg:"User doesn't exist"})}
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "d5dd02379ae0ef",
                pass: "d5e1a8eea10ce0"
            }
        });

        const mailOptions = {
            from: 'kr862913@gmail.com@gmail.com',
            to: user.email,
            subject: 'Reset Password Link',
            html: `<p>Click <a href="http://localhost:5173/resetpassword/${token}">here</a> to reset your password</p>`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("errfromtransporter", error);
            } else {
                // Extract only necessary information for the JWT payload

                // Sign the token with the secret
                const token = setToken(user)
                console.log("token", token)
                // Set the token in a cookie
                res.cookie("accesstoken", token, { httpOnly: true });

                return res.status(200).json({ msg: "Success", user });
            }

        });
    } catch (error) {
        return res.send(400).json({msg:"Error Occured", error})
    }

}
export async function handleResetPassword(req, res) {
    const { newPassword, confirmPassword } = req.body;
    if (!newPassword || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required" });
    }
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match." });
    }
  
    const token = req.cookies.accesstoken;
    if (!token) {
      return res.status(401).json({ msg: "Unauthorized" });
    }
  
    const user = jwtDecode(token);
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      const updatePassword = await User.findOneAndUpdate(
        { email: user.email },
        { password: hashedPassword }
      );
      console.log(updatePassword);
      return res.status(200).json({ msg: "Password Updated Successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ msg: "Error occurred", error });
    }
  }

export async function handleChangePassword(req, res){
    const {currentPassword, newPassword, confirmPassword} = req.body;
    if(!currentPassword || !newPassword || !confirmPassword) {
        return res.status(400).json({msg:"All fields required!"});
    }
    if(newPassword!==confirmPassword){
        return res.status(400).json({msg:"New Password and Confirm Password do not match"})
    }
    const token = req.cookies.accesstoken;
    const user = jwtDecode(token)
    if(user.password!==currentPassword){
        return res.status(400).json({msg:"Incorrect Password"})
    }
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        const changePassword = await User.findOneAndUpdate({email: user.email}, {password:hashedPassword})
        console.log(changePassword)
        return res.status(200).json({msg:"Password Changed Successfully!"})
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }
}
