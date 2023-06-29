import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "../Styles/SingleProduct.module.css";
import { BiArrowBack } from "react-icons/bi";

const SingleProduct = () => {
  let id = useParams();
  id = id.Id;
  // console.log(id)

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, [product]);

  
  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/product/delete/${productId}`);
      alert('delete succesfully')
      fetchProduct();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/product/${id}`);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/products">
          <BiArrowBack />
        </Link>

        <h3>Detailed Products</h3>
      </div>
      <div className={styles.photo}>
        <img src={product.image1} alt="photo" />
      </div>
      <div className={styles.data}>
        <div>
          <div><p>{product.productname}</p>
          <p className={styles.category}>Category: {product.category}</p>
          </div>

          <div><p>Company: {product.company}</p></div>
        </div>
        <div>
          <div><p>Price: {product.price}/-</p></div>
          <div><p>Quantity: {product.quantity}</p></div>
        </div>
      </div>
      
      
     
      <p>Description: {product.description}</p>
      
      
      {/* Render other product details */}
        <div className={styles.btn}>
            
            <Link to={`/editproduct/${product._id}`}>
              <button>Edit</button>
            </Link>
            
            <button onClick={()=>handleDelete(product._id)}>Delete</button>
          </div>
    </div>
  );
};

export { SingleProduct };
