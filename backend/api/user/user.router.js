const router = require("express").Router();
const UserModel = require("./user.controller");
const auth = require("@middlewares/jwt");
// eslint-disable-next-line no-unused-vars
const validate = require("@middlewares/jwt");

router.get("/", auth, UserModel.getAllUser);
router.get("/:id", auth, UserModel.getUserById);
router.post("/", auth, UserModel.createUser);
router.put("/:id", auth, UserModel.updateUser);
router.delete("/:id", auth, UserModel.deleteUser);

module.exports = router;
