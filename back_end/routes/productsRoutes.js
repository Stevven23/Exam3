const express = require("express");
const total = require("../models/total");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const totalProducts = await total.find();
    res.json(totalProducts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

const calculateTotalPrice = async () => {
    const products = await total.find();
    const totalPrice = products.reduce((acc, product) => acc + (product.price || 0), 0);
    return totalPrice;
};

module.exports = router;
