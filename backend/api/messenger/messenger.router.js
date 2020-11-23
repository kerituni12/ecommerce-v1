const express = require("express");
const router = express.Router();

const MessengerServices = require('./messenger.services');

router.get('/', MessengerServices.handleVerifyServer);
router.post('/', MessengerServices.handleWebhookEvent);


module.exports = router;