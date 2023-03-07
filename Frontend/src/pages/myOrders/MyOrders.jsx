import React from "react";
import { Grid } from "@mui/material";
import { Footer, Header } from "../../components";
import Orders from "../../components/Orders";

const MyOrders = () => {
  return (
    <>
      <Header />
      <Grid
        flexDirection={"column"}
        sx={{ mt: 15, width: "100%", ml: 2, mr: 2, mb: 2 }}
      >
        <Orders />
      </Grid>
      <Footer />
    </>
  );
};

export default MyOrders;
