import productModel from "../models/product.js";

export const showProducts = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .skip(req.params.page)
      .limit(req.params.limit);

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
      message: "objects not found",
    });
  }
};

export const showProductsWithSorting = async (req, res) => {
  try {
    const products = await productModel
      .find()
      .skip(req.params.page)
      .limit(req.params.limit)
      .sort({ [req.params.field]: req.params.direction });

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
      message: "objects not found",
    });
  }
};

export const countProducts = async (req, res) => {
  try {
    const total = await productModel.countDocuments();

    res.json(total);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      error: err,
      message: "objects not found",
    });
  }
};
