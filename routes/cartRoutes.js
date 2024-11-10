const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const cartController = require("../controllers/cartController");
const mongoose = require("mongoose");

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res
      .status(400)
      .json({ status: "error", message: "ID de carrito no válido" });
  }

  cartController.getCart(req, res);
});

router.post("/:cid/products", async (req, res) => {
  const { cid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res
      .status(400)
      .json({ status: "error", message: "ID de carrito no válido" });
  }

  cartController.addToCart(req, res);
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;

  if (
    !mongoose.Types.ObjectId.isValid(cid) ||
    !mongoose.Types.ObjectId.isValid(pid)
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "ID de carrito o producto no válido" });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });

    cart.products = cart.products.filter(
      (product) => product.product.toString() !== pid
    );
    await cart.save();
    res.json({ status: "success", message: "Producto eliminado del carrito" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put("/:cid", async (req, res) => {
  const { cid } = req.params;
  const { products } = req.body;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res
      .status(400)
      .json({ status: "error", message: "ID de carrito no válido" });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });

    cart.products = products;
    await cart.save();
    res.json({ status: "success", message: "Carrito actualizado" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  const { cid, pid } = req.params;
  const { quantity } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(cid) ||
    !mongoose.Types.ObjectId.isValid(pid)
  ) {
    return res
      .status(400)
      .json({ status: "error", message: "ID de carrito o producto no válido" });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });

    const product = cart.products.find(
      (product) => product.product.toString() === pid
    );
    if (!product)
      return res.status(404).json({
        status: "error",
        message: "Producto no encontrado en el carrito",
      });

    product.quantity = quantity;
    await cart.save();
    res.json({
      status: "success",
      message: "Cantidad de producto actualizada",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res
      .status(400)
      .json({ status: "error", message: "ID de carrito no válido" });
  }

  try {
    const cart = await Cart.findById(cid);
    if (!cart)
      return res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });

    cart.products = [];
    await cart.save();
    res.json({
      status: "success",
      message: "Todos los productos fueron eliminados del carrito",
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
