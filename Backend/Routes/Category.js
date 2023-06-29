const express = require("express");
const { CategoryModel } = require("../Model/CategoryModel");

const CategoryRouter = express.Router();

// AddRoute
CategoryRouter.post("/post", async (req, res) => {
  const data = req.body;
  try {
    const addCategory = new CategoryModel(data);
    await addCategory.save();
    res.status(200).send("Category added succesfully");
  } catch (err) {
    res.status(400).send("Category adding failed");
    console.log(err);
  }
});
// View Route
CategoryRouter.get("/", async (req, res) => {
  const Category = await CategoryModel.find();
  res.send(Category);
});

// Delete Route
CategoryRouter.delete("/delete/:id", async (req, res) => {
  const CategoryId = req.params.id;
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(CategoryId);
    if (!deletedCategory) {
      return res.status(404).send("Category not found");
    }
    res.status(200).send("Category deleted successfully");
  } catch (err) {
    res.status(500).send("Failed to delete Category");
    console.log(err);
  }
});

module.exports = { CategoryRouter };
