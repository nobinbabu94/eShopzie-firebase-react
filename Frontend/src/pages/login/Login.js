import { Grid } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect } from "react";
import LoginForm from "../../components/LoginForm";
import { Footer, Header } from "../../components";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const navigate = useNavigate();
  
    useEffect(()=>{
      const userToken = localStorage.getItem('usertoken');
      if (userToken ) {
        navigate('/')
    }
    },[navigate ])
    return (

        <> 
        < Header/>
            <Grid flexDirection={'column'} sx={{ mt: 12 }}>
                <motion.div style={{ y: 0 }} animate={{ y: -20 }} sx={{ mt: 5 }}>
                    <LoginForm />
                </motion.div>
            </Grid>
       <Footer/>
        </>
    )

};

export default Login;
