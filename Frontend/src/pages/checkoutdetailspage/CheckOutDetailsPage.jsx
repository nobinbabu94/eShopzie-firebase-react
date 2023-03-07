import { Grid } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";
import CheckoutDetails from "../../components/CheckoutDetails";

const CheckOutDetailsPage = () => {
  return (
    <>
      <Header />
      <Grid flexDirection={"column"} sx={{ mt: 12 }}>
        <CheckoutDetails />
      </Grid>
      <Footer />
    </>
  );
};

export default CheckOutDetailsPage;
