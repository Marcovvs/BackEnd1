const Cart = require("../models/Cart");
const mongoose = require("mongoose");

const getCart = async (req, res) => {
  const { cid } = req.params;

  if (!mongoose.Types.ObjectId.isValid(cid)) {
    return res
      .status(400)
      .json({ status: "error", message: "ID de carrito no válido" });
  }

  try {
    const cart = await Cart.findById(cid).populate("products.product");
    if (!cart) {
      return res.status(404).send("Carrito no encontrado");
    }
    res.json(cart);
  } catch (error) {
    res.status(500).send("Error al obtener el carrito");
  }
};

const addToCart = async (req, res) => {
  const { cid } = req.params;
  const { productId, quantity } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(cid) ||
    !mongoose.Types.ObjectId.isValid(productId)
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

    const existingProduct = cart.products.find(
      (product) => product.product.toString() === productId
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ status: "success", message: "Producto añadido al carrito" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
};

module.exports = { getCart, addToCart };
