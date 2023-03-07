import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/slice/AuthSlice";
import { colors } from "../Styles/theme";
import Footer from "./Footer";
import Header from "./Header";

const ProtectedRoute = ({ children }) => {
  const isloggedIn = useSelector(selectIsLoggedIn);

  if (isloggedIn) {
    return children;
  }

  return (
    <>
      <Header />
      <Grid
        sx={{
          mt: 15,
          width: "100%",
          ml: 2,
          mr: 2,
          mb: 2,
          height: "600px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
        }}
      >
        <Typography>Page not available! Please login</Typography>
        <Link to="/login" style={{ textDecoration: "none" }}>
          <Button variant="contained" sx={{ color: colors.darkBlue }}>
            Please login
          </Button>
        </Link>
      </Grid>
      <Footer />
    </>
  );
};

export default ProtectedRoute;
