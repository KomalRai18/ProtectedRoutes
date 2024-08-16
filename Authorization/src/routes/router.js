import express from 'express'
import {handleSignUp, handleLogin, handleDashboard, handleForgotPassword, handleResetPassword, handleChangePassword} from '../Controllers/signup.js'
import { VerifyJWT } from '../middleware/middleware.js'
import { RoleBasedVerification } from '../middleware/roleBasedMW.js'
import { handleGetComments, handlePostComments } from '../Controllers/comment.js'
const router = express.Router()

router.post('/signup', handleSignUp)
router.post('/login',  handleLogin)
router.get('/dashboard', RoleBasedVerification, handleDashboard)
router.post('/forgotpassword', handleForgotPassword)
router.post('/resetpassword', handleResetPassword)
router.post('/changepassword', handleChangePassword)
router.post('/postComment', handlePostComments)
router.get('/getComment', VerifyJWT, handleGetComments)


router.route("/admin-content").get(RoleBasedVerification(['admin']), (req, res) => {
    res.status(200).json({ msg: "admin content" });
});

router.route("/user-content").get(RoleBasedVerification(['admin', "user"]), (req, res) => {
    res.status(200).json({ msg: "user content" });
});


export default router