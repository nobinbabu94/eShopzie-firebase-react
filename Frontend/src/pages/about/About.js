import { Grid, } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";
import AboutDetails from "../../components/AboutDetails";


const About = () => {
  return (
    <>
      <Header />
      <Grid flexDirection={'column'} sx={{ mt: 12, width: '100%', }}>
        <AboutDetails />
      </Grid>
      < Footer />
    </>
  )

};

export default About;
