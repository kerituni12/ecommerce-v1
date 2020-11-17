const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const client = require("twilio")(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

const utility = require("@helpers/utility");
const mailer = require("@helpers/mailer");
const { APIError } = require("@helpers/ErrorHandler");

// const { verifyOtp, } = require("@middlewares/jwt");

const { mailConfigs, jwtSecret, jwtExpiresIn } = require("@configs/constants");

const UserModel = require("../user/user.model");

exports.register = async (req, res, next) => {
  try {
    // Remove role from body for security
    // eslint-disable-next-line no-unused-vars
    const { role, ...userData } = req.body;
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const confirmOTP = utility.randomNumber(4);

    const user = new UserModel({ ...userData, password: hashPassword, confirmOTP });

    // Send confirmation email
    // let html = "<p>Please Confirm your Account.</p><p>OTP: " + otp + "</p>";
    // await mailer.send(
    //   constants.confirmEmails.from,
    //   req.body.email,
    //   "Confirm Account",
    //   html
    // );

    const newUser = await user.save();
    return res.status(200).json(newUser.getDataResponse());
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) throw new APIError({ message: "Email or Password wrong" });

    const isSamePassword = await bcrypt.compare(req.body.password, user.password);
    if (!isSamePassword) throw new APIError({ message: "Email or Password wrong" });

    if (!user.isConfirmed || !user.status)
      throw new APIError({ message: "Account is not confirmed. Please confirm your account" });

    // Only send role in payload jwt if role # member
    let userData = user.getDataResponse();
    if (user.role !== "member") userData.role = user.role;
    const token = jwt.sign(userData, jwtSecret, { expiresIn: jwtExpiresIn });

    let isOtpVerify = true;
    if (req.cookies.otpKey) {
      const decoded = jwt.verify(req.cookies.otpKey, jwtSecret);
      if (decoded) isOtpVerify = false;
    }
    const splitToken = token.split(".");

    // You can use payload + header in one key cookie  `${splitToken[0]}.${splitToken[1]}`
    // and can use atob(token.split('.')[1]) in front end
    // To more sercurity you can concat with random hash for payload and use it hash in front end to decode payload
    // return (
    //   res
    //     .cookie("signToken", splitToken[2], {
    //       maxAge: jwtExpiresIn * 1000,
    //       secure: true,
    //       sameSite: "none",
    //       httpOnly: true,
    //     })
    //     .cookie("payload", splitToken[1], {
    //       maxAge: jwtExpiresIn * 1000,
    //       secure: true,
    //       sameSite: "none",
    //       httpOnly: false,
    //     })
    //     .cookie("header", splitToken[0], {
    //       maxAge: jwtExpiresIn * 1000,
    //       secure: true,
    //       sameSite: "none",
    //       httpOnly: true,
    //     })

    //     // Use api response with the same params of cookie for both mobile and browser.
    //     // Or use can check header if browser or mobile for separate  cookie response or api response
    //     .json({ user: userData, token, isOtpVerify })
    // );

    return res
      .cookie("signToken", "aaa", {
        maxAge: jwtExpiresIn * 1000,
        secure: true,
        sameSite: "none",
      })
      .end();
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res, next) => {
  try {
    //TODO handle token to blacklist
    res.cookie("token", req.cookies.token, { maxAge: 0 }).end();
  } catch (err) {
    next(err);
  }
};
exports.verifyConfirm = async (req, res, next) => {
  try {
    const query = { email: req.body.email };
    const user = await UserModel.findOne(query);

    if (!user) throw new APIError({ message: "Specified email not found" });
    if (user.confirmOTP !== req.body.otp) throw new APIError({ message: "Otp does not match" });

    await UserModel.findOneAndUpdate(query, { isConfirmed: true, confirmOTP: null });
    return res.status(200).json({ message: "Account confirmed success" });
  } catch (err) {
    next(err);
  }
};

exports.sendOtpAuth = async (req, res, next) => {
  try {
    const query = { email: req.body.email };
    const { phone } = await UserModel.findOne(query, "phone");
    client.verify
      .services(process.env.VERIFY_SERVICE_SID)
      .verifications.create({
        to: `+${phone}`,
        channel: "sms",
      })
      .then((data) => {
        res.status(200).send(data);
      });
  } catch (err) {
    next(err);
  }
};

exports.verifyOtpAuth = async (req, res, next) => {
  const query = { email: req.body.email };
  const { phone } = await UserModel.findOne(query, "phone");
  if (phone) {
    try {
      client.verify
        .services(process.env.VERIFY_SERVICE_SID)
        .verificationChecks.create({
          to: `+${phone}`,
          code: req.body.otp,
        })
        .then((data) => {
          const confirmOTP = utility.randomNumber(4);
          const otpKey = jwt.sign({ confirmOTP }, jwtSecret, { expiresIn: jwtExpiresIn });
          res
            .cookie("otpKey", otpKey, { maxAge: 7200000, secure: true, sameSite: "none", httpOnly: true })
            .status(200)
            .send(data);
        });
    } catch (err) {
      next(err);
    }
  }
};

exports.resendConfirmOtp = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) throw new APIError({ message: "Specified email not found" });
    if (user.isConfirmed) throw new APIError({ message: "Account already confirmed" });

    let otp = utility.randomNumber(4);
    let html = "<p>Please Confirm your Account.</p><p>OTP: " + otp + "</p>";
    user.isConfirmed = false;
    user.confirmOTP = otp;

    await Promise.all([
      mailer.send(mailConfigs.confirmEmails.from, req.body.email, "Confirm Account", html),
      user.save(),
    ]);
    return res.status(200).json({ message: "Confirm otp sent" });
  } catch (err) {
    next(err);
  }
};
