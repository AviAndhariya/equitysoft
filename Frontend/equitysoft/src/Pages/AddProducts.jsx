import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Styles/AddProduct.module.css";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";

const AddProducts = () => {
  const [company, setCompany] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    productname: "",
    category: "",
    company: "",
    description: "",
    price: "",
    quantity: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
  });

  const handleInputCategory = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };
  const handleInputCompany = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    fetchCategories();
    fetchCompany();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/category`);
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompany = async () => {
    try {
      const response = await axios.get("http://localhost:8000/company");
      setCompany(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async () => {
    try {
      await axios.post("http://localhost:8000/product/post", newProduct);
      setNewProduct({
        productname: "",
        category: "",
        company: "",
        description: "",
        price: "",
        quantity: "",
        image1: "",
        image2: "",
        image3: "",
        image4: "",
      });
      alert('new product added')
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/products">
          <BiArrowBack />
        </Link>

        <h3>Add Products</h3>
      </div>

      <div className={styles.form}>
        <input className={styles.name}
          type="text"
          name="productname"
          value={newProduct.productname}
          placeholder="Product Name"
          onChange={handleInputChange}
        />

        {/* Category from backend */}
        <select
          name="category"
          value={newProduct.category}
          onChange={handleInputCategory}
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category.categoryname}>
              {category.categoryname}
            </option>
          ))}
        </select>
        {/* Company from backend */}
        <select
          name="company"
          value={newProduct.company}
          onChange={handleInputCompany}
        >
          <option value="">Select company</option>
          {company.map((company) => (
            <option key={company._id} value={company.companyname}>
              {company.companyname}
            </option>
          ))}
        </select>
        {/* description */}
        <label htmlFor="description" />
        <textarea
          type="text"
          name="description"
          value={newProduct.description}
          placeholder="Description"
          onChange={handleInputChange}
        />
        {/* price */}
        <input
          type="number"
          name="price"
          value={newProduct.price}
          placeholder="price"
          onChange={handleInputChange}
        />
        {/* quantity */}
        <input
          type="number"
          name="quantity"
          value={newProduct.quantity}
          placeholder="quantity"
          onChange={handleInputChange}
        />
        {/* image1 */}
        <input
          type="text"
          name="image1"
          value={newProduct.image1}
          placeholder="image 1"
          onChange={handleInputChange}
        />
        {/* image2 */}
        <input
          type="text"
          name="image2"
          value={newProduct.image2}
          placeholder="image 2"
          onChange={handleInputChange}
        />
       

        <button onClick={addProduct}>Save</button>
      </div>
    </div>
  );
};

export default AddProducts;
