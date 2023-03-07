import { Grid, } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";
import ViewCart from "../../components/ViewCart";

const Cart = () => {
  return (
    <>
      <Header />
      <Grid flexDirection={'column'} sx={{ mt: 12 }}>

        <ViewCart />
      </Grid>
      <Footer />
    </>
  );
};

export default Cart;
