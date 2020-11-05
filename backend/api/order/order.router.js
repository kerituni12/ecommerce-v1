const router = require("express").Router();
const OrderModel = require("./order.controller");
const auth = require("@middlewares/jwt");
// eslint-disable-next-line no-unused-vars
const validate = require("@middlewares/jwt");

router.get("/", auth, OrderModel.getAllOrder);
router.get("/:id", auth, OrderModel.getOrderById);
router.post("/", auth, OrderModel.createOrder);
router.put("/:id", auth, OrderModel.updateOrder);
router.delete("/:id", auth, OrderModel.deleteOrder);

module.exports = router;
