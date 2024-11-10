const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const productsController = require("../controllers/productsController");

router.get("/", async (req, res) => {
  const { limit = 10, page = 1, sort, query } = req.query;
  const options = {
    limit: parseInt(limit),
    page: parseInt(page),
    sort: sort === "asc" ? { price: 1 } : sort === "desc" ? { price: -1 } : {},
  };
  const searchQuery = query
    ? { $or: [{ category: query }, { availability: query }] }
    : {};

  try {
    const result = await Product.paginate(searchQuery, options);
    res.json({
      status: "success",
      payload: result.docs,
      totalPages: result.totalPages,
      prevPage: result.prevPage,
      nextPage: result.nextPage,
      page: result.page,
      hasPrevPage: result.hasPrevPage,
      hasNextPage: result.hasNextPage,
      prevLink: result.hasPrevPage
        ? `/api/products?limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}`
        : null,
      nextLink: result.hasNextPage
        ? `/api/products?limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}`
        : null,
    });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

router.post("/", productsController.createProduct);

module.exports = router;
