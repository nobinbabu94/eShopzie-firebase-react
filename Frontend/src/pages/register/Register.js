import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Footer, Header } from "../../components";

import RegisterForm from "../../components/RegisterForm";

const Register = () => {
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
                <motion.div style={{ y: -20 }} animate={{ y: 0 }}>
                    <RegisterForm />
                </motion.div>
            </Grid>
     <Footer/>
        </>
    );
};

export default Register;
