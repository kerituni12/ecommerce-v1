const router = require("express").Router();

const auth = require("@middlewares/jwt");
const validate = require("@middlewares/validate");

const { categoryCreateRule } = require("./category.validate");
const CategoryController = require("./category.controller");

router.get("/", CategoryController.getAllCategory);
router.get("/:slug", CategoryController.getCategoryBySlug);
router.post("/", validate(categoryCreateRule), CategoryController.createCategory);
router.put("/:slug", validate(categoryCreateRule), CategoryController.updateCategory);
router.delete("/:slug", CategoryController.deleteCategory);

module.exports = router;
