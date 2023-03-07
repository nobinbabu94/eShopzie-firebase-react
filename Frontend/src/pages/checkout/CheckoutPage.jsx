import { Grid } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";

import CheckOut from "../../components/CheckOut";

const CheckoutPage = () => {
  return (
    <>
      <Header />
      <Grid flexDirection={"column"} sx={{ mt: 12, p: 4 }}>
        <CheckOut />
      </Grid>
      <Footer />
    </>
  );
};

export default CheckoutPage;
