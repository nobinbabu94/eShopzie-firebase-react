import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  useEffect(()=>{
    const userToken = localStorage.getItem('usertoken');
    if(!userToken){
      navigate('/login')

    }
  },[navigate])
  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          height: "500px",
          display: "flex",
          flexDirection: "column",alignItems:'center',
          gap: 2,mt:5
        }}
      >
        <Typography variant="h5" component="h6">
          Checkout Success
        </Typography>
        <Typography>Thank you for your purchase</Typography>
        <Grid>
          <Link to='/order-history' style={{textDecoration:'none'}}>
          <Button variant="contained" sx={{ textTransform: "none" }}>
            View order status
          </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
};

export default CheckoutSuccess;
