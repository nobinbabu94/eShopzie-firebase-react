import { Button, Grid, Hidden, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const LaptopHome = () => {
  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center ",
          p: 2,
        }}
      >
        <Grid
          item
          sx={{
            height: 350,
            width: { xl: "50%", lg: "50%", md: "50%", sm: "100%", xs: "100%" },
            p: 2,
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            overflow: "hidden",
            backgroundImage:
              'url("https://blog.placeit.net/wp-content/uploads/2018/04/MACBOOK-MOCKUP-ON-A-SOFA-WITH-A-CAT.jpg")',
          }}
        >
          <Link to="shop">
            <Button variant="contained">Shop</Button>
          </Link>
        </Grid>
        <Hidden mdDown>
          <Grid
            item
            sx={{
              width: "50%",
              p: 10,
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h6">
              Get the best Laptops Online from
              <Typography variant="h5"> eShopzie.</Typography> Shop from top
              Laptop Brands like Apple, HP, Lenovo, Microsoft, Dell, iBall &
              more.
            </Typography>
            <Link to="shop">
              <Button variant="contained" sx={{ position: "" }}>
                Shop
              </Button>
            </Link>
          </Grid>
        </Hidden>
      </Grid>
    </>
  );
};

export default LaptopHome;
