const slugify = require("@helpers/slugify");
const { APIError } = require("@helpers/ErrorHandler");

const Category = require("./category.model");

exports.getAllCategory = async (req, res, next) => {
  try {
    let categories = (await Category.find()) || [];
    return res.status(200).json({ categories });
  } catch (err) {
    next(err);
  }
};

exports.getCategoryBySlug = async (req, res, next) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (category === null) throw new APIError({ message: "category not exits", status: 404 });
    return res.status(200).json({ category });
  } catch (err) {
    next(err);
  }
};



exports.createCategory = async (req, res, next) => {
  try {
    let slug = req.body.slug;
    slug = !slug ? slugify(req.body.title) : slug;
    const category = new Category({ ...req.body, slug });
    const categoryData = await category.save();
    return res.status(200).json(categoryData);
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    let slug = req.body.slug;
    slug = !slug ? slugify(req.body.title) : slug;
    const category = { ...req.body, slug };
    const result = await Category.findOneAndUpdate({ slug: req.params.slug }, category, { new: true });
    if (result === null) throw new APIError({ message: "can't update category not exits" });
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const result = await Category.findOneAndRemove({ slug: req.params.slug });
    if (result === null) throw new APIError({ message: "can't delete category not exits" });
    return res.status(200).end();
  } catch (err) {
    next(err);
  }
};
