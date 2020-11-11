const slugify = require("@helpers/slugify");
const Product = require("./product.model");
const { APIError } = require("@helpers/ErrorHandler");

exports.getAllProduct = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (product === null) throw new APIError({ message: "Product not exits" });
    return res.json({ product });
  } catch (err) {
    next(err);
  }
};

exports.getPriceForProducts = async (req, res, next) => { 
  try {
    const priceForProducts = await Product.find(
      { _id: { $in: req.query.items } },
      "title price image inventory"
    ).exec();
    // if (product === null) throw new APIError({ message: "Product not exits" });
    return res.json(priceForProducts);
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    let slug = req.body.slug;
    slug = !slug ? slugify(req.body.title) : slug;
    const product = new Product({ ...req.body, slug });
    const productData = await product.save();
    return res.status(200).json(productData);
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const result = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, { new: true });
    if (result === null) throw new APIError({ message: "Product not exits" });
    return res.json({ result });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const result = await Product.findOneAndRemove({ slug: req.params.slug });
    if (result === null) throw new APIError({ message: "Product not exits" });
    return res.end();
  } catch (err) {
    next(err);
  }
};
