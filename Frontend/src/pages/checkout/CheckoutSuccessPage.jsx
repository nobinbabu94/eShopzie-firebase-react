import { Grid } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";

import CheckoutSuccess from "../../components/CheckoutSuccess";

const CheckoutSuccessPage = () => {
  return (
    <>
      <Header />
      <Grid flexDirection={"column"} sx={{ mt: 12, p: 4 }}>
        <CheckoutSuccess />
      </Grid>
      <Footer />
    </>
  );
};

export default CheckoutSuccessPage;
