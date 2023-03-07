import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "../../components";

import ResetForm from "../../components/ResetForm";

const Reset = () => {
    const navigate = useNavigate();
  
    useEffect(()=>{
      const userToken = localStorage.getItem('usertoken');
    
      if (userToken ) {
        navigate('/')
    }
    },[navigate])
    return (

        <>
    <Header/>
            <Grid flexDirection={'column'} sx={{ mt: 12 }}>
                <motion.div style={{ y: 0 }} animate={{ y: -20 }} sx={{ mt: 5 }} >
                    <ResetForm />
                </motion.div>
            </Grid>
        <Footer/>
        </>
    )
};

export default Reset;
