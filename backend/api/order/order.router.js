const router = require("express").Router();
const OrderController = require("./order.controller");
// const auth = require("@middlewares/jwt");
// eslint-disable-next-line no-unused-vars
// const validate = require("@middlewares/jwt");

router.get("/", OrderController.getAllOrder);
router.get("/:id", OrderController.getOrderById);
router.post("/", OrderController.createOrder);
router.put("/:id", OrderController.updateOrder);
router.delete("/:id", OrderController.deleteOrder);

module.exports = router;
