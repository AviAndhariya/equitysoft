import React from "react";
import styles from "../Styles/Home.module.css";
import { Link } from "react-router-dom";

export const Home = () => {
  return (
    <div className={styles.container}>
      <Link style={{textDecoration:'none', color:"white"}} to={'/'}>
      <div className={styles.nav}>
        <h3>Home</h3>
      </div>
      </Link>
      <Link style={{textDecoration:'none', color:"white"}} to={'/products'}>
      <div className={styles.box}>
        <p>Products</p>
      </div>
      </Link>
      <Link style={{textDecoration:'none', color:"white"}} to={'/category'}>
      <div className={styles.box}>
        <p>Manage Category</p>
      </div>
      </Link>
      <Link style={{textDecoration:'none', color:"white"}} to={'/company'}>
      <div className={styles.box}>
        <p>Manage Company</p>
      </div>
      </Link>
    </div>
  );
};
