const router = require("express").Router();
const VnPayController = require("./vnpay.controller");

router.get("/",  VnPayController.getVnPayReturn);
router.post("/",  VnPayController.createPaymentUrl);
module.exports = router;
