import axios from "axios";
import React, { useEffect, useState } from "react";
import styles from "../Styles/Company.module.css";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
export const Company = () => {
  const [company, setCompany] = useState([]);
  const [companyname, setCompanyname] = useState("");

  const addCompany = async () => {
    try {
      await axios.post("http://localhost:8000/company/post", { companyname });
      setCompanyname("");
      fetchCompany();
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

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:8000/company/delete/${productId}`);
      fetchCompany();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCompany();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.nav}>
        <Link style={{ textDecoration: "none", color: "white" }} to="/">
          <BiArrowBack />
        </Link>

        <h3>Manage Companies</h3>
      </div>
      <div>
        <label htmlFor="companyname">Company Name:</label>
        <input
          type="text"
          id="companyname"
          value={companyname}
          onChange={(e) => setCompanyname(e.target.value)}
        />
        <div className={styles.btn}>
          <button onClick={addCompany}>Add</button>
        </div>
      </div>
      <p>List of Companies:</p>
      {company.map((company) => (
        <div className={styles.list} key={company._id}>
          <p>{company.companyname}</p>
          <div className={styles.bin} onClick={()=>handleDelete(company._id)}>
            <MdDelete />
          </div>
        </div>
      ))}
    </div>
  );
};
