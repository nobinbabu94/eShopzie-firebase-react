import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProduct from "../../components/admin/AddProduct";

const AddProductAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("admintokenId@#");

    if (!adminToken) {
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <>
      <Grid flexDirection={"column"} sx={{ mt: 12 }}>
        <AddProduct />
      </Grid>
    </>
  );
};

export default AddProductAdmin;
