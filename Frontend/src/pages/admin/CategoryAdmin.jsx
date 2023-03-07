import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ViewCategory from "../../components/admin/ViewCategory";

const CategoryAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const adminToken = localStorage.getItem("admintokenId@#");

    if (!adminToken) {
      navigate("/admin-login");
    }
  }, []);
  return (
    <>
      <Grid flexDirection={"column"} sx={{ mt: 12 }}>
        <ViewCategory />
      </Grid>
    </>
  );
};

export default CategoryAdmin;
