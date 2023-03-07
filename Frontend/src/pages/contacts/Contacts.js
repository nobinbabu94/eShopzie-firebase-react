import { Grid, } from "@mui/material";
import React from "react";
import { Footer, Header } from "../../components";
import ContactForm from "../../components/ContactForm";


const Contacts = () => {
  return (
    <>
      < Header />
      <Grid flexDirection={'column'} sx={{ mt: 12, p: 2, width: '100%', height: 'auto' }}>
        <ContactForm />
      </Grid>
      <Footer />


    </>
  );
};

export default Contacts;
