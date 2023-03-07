import { Grid } from "@mui/material";
import React from "react";
import ProductEditModal from "../../components/admin/ProductEditModal";

const EditProductAdmin = () => {
  return (
    <>
      <Grid flexDirection={"column"} sx={{ mt: 12 }}>
        <ProductEditModal />
      </Grid>
    </>
  );
};

export default EditProductAdmin;
