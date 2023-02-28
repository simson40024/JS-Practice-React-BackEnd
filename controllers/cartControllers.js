import userModel from "../models/user.js";
import productModel from "../models/product.js";

export const getCart = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.userId });
    const userCartIDs = user.cart.map((item) => item.id);

    const products = await productModel.find({
      _id: { $in: userCartIDs },
    });

    const cart = [];

    for (let i = 0; i <= userCartIDs.length; i++) {
      let prod = products.find((item) => item._id == userCartIDs[i]);

      if (prod) {
        cart.push({
          id: prod._id,
          name: prod.name,
          price: prod.price,
          imgUrl: prod.imgUrl,
          quantity: user.cart[i].quantity,
        });
      }
    }

    res.json(cart);
  } catch (err) {
    res.status(500).json({
      message: "error getting cart",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findOne({ _id: userId });
    const updatingCart = user.cart.concat([
      {
        id: req.body.id,
        name: req.body.name,
        quantity: req.body.quantity,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
      },
    ]);
    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        cart: updatingCart,
      }
    );

    res.json({
      succes: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "error of update",
    });
  }
};

export const updateCart = async (req, res) => {
  try {
    console.log("will be updating");
    const userId = req.userId;
    const user = await userModel.findOne({ _id: userId });

    const updatingCart = user.cart.map((product) => {
      if (product.id === req.body.id)
        product.quantity = product.quantity + req.body.quantity;

      return product;
    });

    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        cart: updatingCart,
      }
    );

    res.json({
      succes: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "error of update",
    });
  }
};

export const delFromCart = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await userModel.findOne({ _id: userId });
    const updatingCart = user.cart.filter(
      (product) => product.id != req.body.id
    );

    await userModel.updateOne(
      {
        _id: userId,
      },
      {
        cart: updatingCart,
      }
    );
    res.json({
      succes: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "error of update",
    });
  }
};
