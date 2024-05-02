import express from "express";
import { registerUser, loginUser, logoutUser, current_user, verify_account, resendVerficationMail, ResetPassword, forgotPassword, updatePassword, updateUserDetails } from "../controllers/user.controllers.js"
import {verifyJwt} from "../middlewares/auth.middleware.js"

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/verify/:token').patch(verify_account)
router.route('/login').post(loginUser);
router.route('/me').get(verifyJwt,current_user)
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/resend/verify_token').post(resendVerficationMail)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(ResetPassword)
router.route('/password/update').patch(verifyJwt,updatePassword)
router.route('/profile/update').put(verifyJwt,updateUserDetails)

export default router;