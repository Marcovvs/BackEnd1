const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const productController = require("../controllers/productsController");
const cartController = require("../controllers/cartController");

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("index", { products });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

router.get("/products/:id", productController.getProduct);

router.get("/cart", cartController.getCart);

module.exports = router;
