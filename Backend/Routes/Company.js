const express = require("express");
const { CompanyModel } = require("../Model/CompanyModel");

const CompanyRouter = express.Router();

// AddRoute
CompanyRouter.post("/post", async (req, res) => {
  const data = req.body;
  try {
    const addCompany = new CompanyModel(data);
    await addCompany.save();
    res.status(200).send("Company added succesfully");
  } catch (err) {
    res.status(400).send("Company adding failed");
    console.log(err);
  }
});
// View Route
CompanyRouter.get("/", async (req, res) => {
  const Company = await CompanyModel.find();
  res.send(Company);
});

// Delete Route
CompanyRouter.delete("/delete/:id", async (req, res) => {
    const companyId = req.params.id;
    try {
      const deletedCompany = await CompanyModel.findByIdAndDelete(companyId);
      if (!deletedCompany) {
        return res.status(404).send("Company not found");
      }
      res.status(200).send("Company deleted successfully");
    } catch (err) {
      res.status(500).send("Failed to delete company");
      console.log(err);
    }
  });
  

module.exports = { CompanyRouter };
