import { Grid, } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminHeader from "../../components/admin/AdminHeader";

const HeaderAdmin = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const adminToken = localStorage.getItem('admintokenId@#');
  
    if (!adminToken ) {
      navigate('/admin-login')
  }
  },[navigate])

  return (
    <>
      <Grid >
        <AdminHeader />
      </Grid>
    </>
  );
};

export default HeaderAdmin;
