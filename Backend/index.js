const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const { connection } = require("./config/db");
const { CompanyRouter } = require('./Routes/Company');
const { CategoryRouter } = require("./Routes/Category");
const { ProductRouter } = require("./Routes/Product");

app.use(express.json());
app.use(cors());
const port = process.env.PORT || 8000;

// Company Route
app.use("/company", CompanyRouter);

// Category Route
app.use("/category", CategoryRouter);

// Product Route
app.use("/product", ProductRouter);

// check the server
app.get("/", (req, res) => {
    res.send("halyyu ho");
  });

// Start the server
app.listen(process.env.port, async () => {
    try {
      await connection;
      console.log("connection to db successfull");
    } catch (err) {
      console.log("connection to db failed");
      console.log(err);
    }
  });