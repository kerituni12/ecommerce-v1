const jwt = require("express-jwt");
const { jwtSecret } = require("@configs/constants");

const authenticate = jwt({
  secret: jwtSecret,
  getToken: (req) => {
    // If req has Bearer  -> mobile auth , else browser auth using cookie
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer")
      return req.headers.authorization.split(" ")[1];

    return `${req.cookies.header}.${req.cookies.payload}.${req.cookies.signToken}`;
  },
});

// exports.verifyOtp = jwt({
//   secret: jwtSecret,
//   getToken: (req) => {
//     // If req has Bearer  -> mobile auth , else browser auth using cookie
//     if (req.headers.otpKey && req.headers.otpKey.split(" ")[0] === "Bearer") return req.headers.otpKey.split(" ")[1];

//     console.log("verifyOtp ", req.cookies.otpKey);
//     return req.cookies.otpKey;
//   },
// });

module.exports = authenticate;
