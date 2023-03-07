import { Grid } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";
import Review from "../../components/Review";

const ReviewPage = () => {
  return (
    <>
      <Header />
      <Grid flexDirection={"column"} sx={{ mt: 12 }}>
        <Review />
      </Grid>
      <Footer />
    </>
  );
};

export default ReviewPage;
