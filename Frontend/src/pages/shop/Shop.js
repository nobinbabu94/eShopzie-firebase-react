import React from "react";
import { Grid } from "@mui/material";
import { Footer, Header } from "../../components";
import ShopProducts from "../../components/ShopProducts";

const Shop = () => {
  return (
    <>
      <Header />
      <Grid flexDirection={'column'} sx={{ mt: 12 }}>
        <ShopProducts />
      </Grid>
      <Footer />
    </>
  );
};

export default Shop;
