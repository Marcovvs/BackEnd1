const express = require("express");
const router = express.Router();
const productController = require("../controllers/productsController");
const cartController = require("../controllers/cartController");

router.get("/", async (req, res) => {
  try {
    const products = await productController.getProducts();
    res.render("index", { products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al obtener los productos");
  }
});

router.get("/products/:id", async (req, res) => {
  try {
    const product = await productController.getProduct(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al obtener el producto");
  }
});

router.get("/cart", async (req, res) => {
  try {
    const cart = await cartController.getCart(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send("Hubo un error al obtener el carrito");
  }
});

module.exports = router;
