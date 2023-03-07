import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewProduct from "../../components/admin/ViewProduct";

const ProductsAdmin = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const adminToken = localStorage.getItem('admintokenId@#');
  
    if (!adminToken ) {
      navigate('/admin-login')
  }
  },[navigate])

  return (
    <>
      <Grid>
        <ViewProduct />
      </Grid>
    </>
  );
};

export default ProductsAdmin;
