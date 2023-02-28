import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import * as userControllers from "./controllers/userControllers.js";
import * as productControllers from "./controllers/productControllers.js";
import * as currencyRatesControllers from "./controllers/currencyRatesControllers.js";
import * as cartControllers from "./controllers/cartControllers.js";

mongoose
  .connect(
    "mongodb+srv://admin:admin@cluster0.rc5zmpd.mongodb.net/eShop?retryWrites=true&w=majority"
  )
  .then(() => console.log("DataBase status: OK"))
  .catch((err) => console.log("DataBase status error: ", err));

const app = new express();
app.use(express.json());
app.use(cors());

app.post("/register", userControllers.registration);
app.post("/sign", userControllers.signIn);

app.get("/currency/:currency", currencyRatesControllers.getRate);
app.post("/currency/", currencyRatesControllers.addCurrencyRate);

app.get("/page", productControllers.countProducts);
app.get("/page/:page/:limit", productControllers.showProducts);
app.get(
  "/page/:page/:limit/:field/:direction",
  productControllers.showProductsWithSorting
);

app.get("/cart", userControllers.checkUser, cartControllers.getCart);
app.post("/cart", userControllers.checkUser, cartControllers.addToCart);
app.patch("/cart", userControllers.checkUser, cartControllers.updateCart);
app.delete("/cart", userControllers.checkUser, cartControllers.delFromCart);

app.listen(8001, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("server started OK");
});
