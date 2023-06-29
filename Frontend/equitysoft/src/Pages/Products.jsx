import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../Styles/Products.module.css";
import { FaPlus } from "react-icons/fa";
import { BiArrowBack } from "react-icons/bi";
import { Link } from "react-router-dom";

export const Products = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/product/delete/${productId}`);
      fetchProducts();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/product");
      console.log(response.data);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <BiArrowBack />
        </Link>

        <h3>Products</h3>
        <Link
          style={{ textDecoration: "none", color: "white" }}
          to={"/addproducts"}
        >
          <FaPlus />
        </Link>
      </div>
      {product.map((product) => (
        <div className={styles.box} key={product._id}>
          <Link to={`/products/${product._id}`}>
            <div>
              <img className={styles.photo} src={product.image1} alt="image" />
            </div>
          </Link>
          <div className={styles.desc}>
            <p>{product.productname}</p>
            <p>{product.category}</p>
            <p>Qty : {product.quantity}</p>
          </div>
          <div className={styles.btn}>
            <Link to={`/editproduct/${product._id}`}>
              <button>Edit</button>
            </Link>

            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};
