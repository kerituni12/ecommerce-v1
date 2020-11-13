const express = require("express");
const AuthController = require("./auth.controller");
const { registerRule, loginRule, resendConfirmRule, verifyConfirmRule } = require("./auth.validate");
const auth = require("@middlewares/jwt");
const validate = require("@middlewares/validate");

var router = express.Router();

router.post("/register", validate(registerRule), AuthController.register);
router.post("/login", validate(loginRule), AuthController.login);
router.post("/logout", auth, AuthController.logout);
router.post("/verify-otp", validate(verifyConfirmRule), AuthController.verifyConfirm);
router.post("/send-otp-auth", auth, AuthController.sendOtpAuth);
router.post("/verify-otp-auth", auth, AuthController.verifyOtpAuth);
router.post("/resend-verify-otp", validate(resendConfirmRule), AuthController.resendConfirmOtp);

module.exports = router;
