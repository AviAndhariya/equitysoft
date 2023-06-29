import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../Styles/Company.module.css";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const addCategory = async () => {
    try {
      await axios.post("http://localhost:8000/category/post", { categoryname: categoryName });
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8000/category");
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId) => {
    try {
      await axios.delete(`http://localhost:8000/category/delete/${categoryId}`);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <BiArrowBack />
        </Link>

        <h3>Manage Categories</h3>
      </div>
      <div>
        <label htmlFor="categoryname">Category Name:</label>
        <input
          type="text"
          id="categoryname"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
        />
        <div className={styles.btn}>
          <button onClick={addCategory}>Add</button>
        </div>
      </div>
      <p>List of Categories:</p>
      {categories.map((category) => (
        <div className={styles.list} key={category._id}>
          <p>{category.categoryname}</p>
          <div className={styles.bin} onClick={() => handleDelete(category._id)}>
            <MdDelete />
          </div>
        </div>
      ))}
    </div>
  );
};
