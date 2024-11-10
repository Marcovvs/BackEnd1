const Product = require("../models/Product");

const createProduct = async (req, res) => {
  try {
    const { name, price, category, availability } = req.body;

    if (!name || !price || !category || availability === undefined) {
      return res.status(400).json({
        status: "error",
        message: "Faltan datos obligatorios para crear el producto.",
      });
    }

    const newProduct = new Product({
      name,
      price,
      category,
      availability,
    });

    await newProduct.save();

    res.status(201).json({
      status: "success",
      message: "Producto creado exitosamente",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  createProduct,
};
