import { Grid } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";
import WishlistProducts from "../../components/WishlistProducts";

const Wishlist = () => {
  return (

    <>
      <Header />
      <Grid flexDirection={'column'} sx={{ mt: 12 }}>
        <WishlistProducts />
      </Grid>
      <Footer />
    </>
  );
};

export default Wishlist;
