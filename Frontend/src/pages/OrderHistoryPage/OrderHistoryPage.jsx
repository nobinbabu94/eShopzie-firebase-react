import { Grid } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";
import OrderHistory from "../../components/OrderHistory";

const OrderHistoryPage = () => {
  return (
    <>
      <Header />
      <Grid
        flexDirection={"column"}
        sx={{ mt: 12 }}
      >
        <OrderHistory />
      </Grid>
      <Footer />
    </>
  );
};

export default OrderHistoryPage;
