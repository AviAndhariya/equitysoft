import React from "react";
import { Route, Routes } from "react-router-dom";
import { Products } from "./Products";
import { Category } from "./Category";
import { Company } from "./Company";
import { Home } from "./Home";
import AddProducts from "./AddProducts";
import {EditProduct} from "./EditProduct";
import { SingleProduct } from "./SingleProduct";




export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/addproducts" element={<AddProducts />} />
      <Route path="/category" element={<Category />} />
      <Route path="/company" element={<Company />} />
      <Route path="/editproduct/:id" element={<EditProduct />} />
      <Route path="/products/:Id" element={<SingleProduct />} />
    </Routes>
  );
};
