const router = require("express").Router();
const OrderModel = require("./order.controller");
// const auth = require("@middlewares/jwt");
// eslint-disable-next-line no-unused-vars
// const validate = require("@middlewares/jwt");

router.get("/", OrderModel.getAllOrder);
router.get("/:id", OrderModel.getOrderById);
router.post("/", OrderModel.createOrder);
router.put("/:id", OrderModel.updateOrder);
router.delete("/:id", OrderModel.deleteOrder);

module.exports = router;
