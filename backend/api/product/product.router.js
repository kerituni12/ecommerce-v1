const router = require("express").Router();
const ProductController = require("./product.controller");
const { productRule } = require("./product.validate");
const validate = require("@middlewares/validate");
const auth = require("@middlewares/jwt");

router.get("/get-price-for-products", ProductController.getPriceForProducts);
router.get("/get-product-of-category/:slug", ProductController.getProductOfCategory);
router.get("/", ProductController.getAllProduct);
router.get("/:slug", ProductController.getProductBySlug);
router.post("/", ProductController.createProduct);
router.put("/:slug", validate(productRule), ProductController.updateProduct);
router.delete("/:slug", ProductController.deleteProduct);

module.exports = router;
