const express = require("express");
const AuthController = require("./auth.controller");
const { registerRule, loginRule, resendConfirmRule, verifyConfirmRule } = require("./auth.validate");
const auth = require("@middlewares/jwt");
const validate = require("@middlewares/validate");

var router = express.Router();

router.post("/register", validate(registerRule), AuthController.register);
router.post("/login", validate(loginRule), AuthController.login);
router.post("/logout",  AuthController.logout);
router.get("/verify-otp", AuthController.verifyConfirm);
router.post("/send-otp-auth",  AuthController.sendOtpAuth);
router.post("/verify-otp-auth",  AuthController.verifyOtpAuth);
router.post("/resend-verify-otp", validate(resendConfirmRule), AuthController.resendConfirmOtp);

module.exports = router;
