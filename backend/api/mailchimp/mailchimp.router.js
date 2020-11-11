const router = require("express").Router();
const MailChimpController = require("./mailchimp.controller");
// const auth = require("@middlewares/jwt");

router.get("/", MailChimpController.getListAudience);

module.exports = router;
