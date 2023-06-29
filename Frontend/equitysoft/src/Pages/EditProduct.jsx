import { Link, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Styles/EditProduct.module.css";
import { BiArrowBack } from "react-icons/bi";

const EditProduct = () => {
  const { id } = useParams();

  const [productData, setProductData] = useState({
    productname: "",
    price: "",
    description: "",
    quantity: "",
  });

  useEffect(() => {
    fetchProductData();
  }, []);

  const fetchProductData = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/${id}`);
      const product = response.data;
      setProductData({
        productname: product.productname || "",
        price: product.price || "",
        description: product.description || "",
        quantity: product.quantity || "",
      });
    } catch (error) {
      console.error("Failed to fetch product data:", error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.patch(
        `http://localhost:8000/product/edit/${id}`,
        productData
      );
      alert("Product updated successfully");
    } catch (error) {
      console.error("Failed to update product:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/products">
          <BiArrowBack />
        </Link>

        <h3>Edit Product</h3>
      </div>
      <div >
        <form onSubmit={handleFormSubmit}>
          <div className={styles.flex}>
            <label htmlFor="productname">Name:</label>
            <input
              type="text"
              id="productname"
              name="productname"
              value={productData.productname}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={productData.price}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={productData.description}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit">Update Product</button>
        </form>
      </div>
    </div>
  );
};

export { EditProduct };
