const mongoose = require("mongoose");

const CompanySchema = mongoose.Schema({
  companyname: { type: String, required: true },
});

const CompanyModel = mongoose.model("company", CompanySchema);

module.exports = { CompanyModel };
