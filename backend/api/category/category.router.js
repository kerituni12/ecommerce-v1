const router = require("express").Router();

const auth = require("@middlewares/jwt");
const validate = require("@middlewares/validate");

const { categoryCreateRule } = require("./category.validate");
const CategoryController = require("./category.controller");

router.get("/", CategoryController.getAllCategory);
router.get("/:slug", CategoryController.getCategoryBySlug);
router.post("/", auth, validate(categoryCreateRule), CategoryController.createCategory);
router.put("/:slug", auth, validate(categoryCreateRule), CategoryController.updateCategory);
router.delete("/:slug", auth, CategoryController.deleteCategory);

module.exports = router;
