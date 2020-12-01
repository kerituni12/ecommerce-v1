const express = require("express");
const router = express.Router();

const MessengerController = require("./messenger.controller");

router.get("/", MessengerController.handleVerifyServer);
router.post("/", MessengerController.handleWebhookEvent);

module.exports = router;
