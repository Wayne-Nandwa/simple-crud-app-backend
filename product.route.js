const express = require('express');
const Product = require("../models/product.model.js");
const router = express.Router();
const {getProducts, getProduct} = require('../controllers/product.controller.js');

//controller fn
router.get('/', getProducts);
router.get("/:id", getProduct);


module.exports = router;