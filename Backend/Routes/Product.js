const express = require("express");
const { ProductModel } = require("../Model/ProductModel");

const ProductRouter = express.Router();

// AddRoute
ProductRouter.post("/post", async (req, res) => {
  const data = req.body;
  try {
    const addProduct = new ProductModel(data);
    await addProduct.save();
    res.status(200).send("Product added succesfully");
  } catch (err) {
    res.status(400).send("Product adding failed");
    console.log(err);
  }
});
// View Route
ProductRouter.get("/", async (req, res) => {
  const Product = await ProductModel.find();
  res.send(Product);
});

// Single Product Route
ProductRouter.get("/:id", async (req, res) => {
  const productId = req.params.id;
  try {
    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.send(product);
  } catch (err) {
    res.status(500).send("Failed to fetch product");
    console.log(err);
  }
}); 


// Edit Route
ProductRouter.patch("/edit/:id", async (req, res) => {
  const productId = req.params.id;
  const updatedData = req.body;
  try {
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      productId,
      updatedData,
      { new: true }
    );
    if (!updatedProduct) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send("Product updated successfully");
  } catch (err) {
    res.status(500).send("Failed to update product");
    console.log(err);
  }
});

// Delete Route
ProductRouter.delete("/delete/:id", async (req, res) => {
  const ProductId = req.params.id;
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(ProductId);
    if (!deletedProduct) {
      return res.status(404).send("Product not found");
    }
    res.status(200).send("Product deleted successfully");
  } catch (err) {
    res.status(500).send("Failed to delete Product");
    console.log(err);
  }
});

module.exports = { ProductRouter };
