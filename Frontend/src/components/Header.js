import { AppBar, Grid, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { colors } from "../Styles/theme";
import AvtarCart from "./AvtarCart";
import AvtarWishlist from "./AvtarWishlist";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import MenuDrawer from "./MenuDrawer";
import UserDrawer from "./UserDrawer";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { useDispatch } from "react-redux";
import { SET_ACTIVE_USER, REMOVE_ACTIVE_USER } from "../redux/slice/AuthSlice";



const Header = () => {
  const [displayName, setDisplayName] = useState('')
  const dispatch = useDispatch()


  //currently signed user here
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {

        
        setDisplayName(user.displayName)

        dispatch(SET_ACTIVE_USER({
          email: user.email, userName: user.displayName || user.email, userId: user.uid
        }))
      } else {
        setDisplayName("")
        dispatch(REMOVE_ACTIVE_USER())
      }
    });

  }, [dispatch, displayName,])



  const AppStyle = {
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
  };
  const containerStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    mt: 2,
  };
  const LogoStyle = {
    transition: "transform 0.5s ease-in-out",
    cursor: "pointer",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1.05)",
    },
    width: { xl: "15%", lg: "15%", md: "15%", sm: "50%", xs: "50%" },
    display: { sm: "flex", xs: "flex", lg: "flex", md: "flex", xl: "flex" },
    justifyContent: { sm: "start", xs: "start", md: "start", xl: "start" },
  };

  const menuStyle = {
    width: "30%",
    justifyContent: "space-evenly",
    display: { sm: "none", xs: "none", lg: "flex", md: "flex", xl: "flex" },
  };

  const cartStyle = {
    width: "15%",
    alignItems: "center",
    justifyContent: "space-evenly",
    display: { sm: "none", xs: "none", lg: "flex", md: "flex", xl: "flex" },
  };

  const hambergStyle = {
    width: { xl: "15%", lg: "15%", md: "15%", sm: "50%", xs: "50%" },
    alignItems: "center",
    display: { sm: "flex", xs: "flex", lg: "none", md: "none", xl: "none" },
    justifyContent: { sm: "end", xs: "end", md: "end", lg: "end", xl: "end" },
  };
  const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between",
    height: "100px",
  });

  const NavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? colors.black : "white",
      textDecoration: isActive ? "none" : "none",
    };
  };
  return (
    <>
      <AppBar sx={AppStyle}>
        <Container>
          <StyledToolbar>
            <Grid container maxWidth={"xl"} sx={containerStyle}>
              <Grid item sx={LogoStyle}>

                <Typography sx={{ fontSize: "2rem", color: colors.amber }}>
                  eSho
                </Typography>
                <Typography sx={{ fontSize: "2rem" }}>
                  pzie
                </Typography>
              </Grid>
              <Grid item sx={menuStyle}>
                <NavLink to="/" style={NavLinkStyle}>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      fontSize: ".9rem",
                      "&:hover": {
                        color: colors.amber,
                      },
                    }}
                  >
                    Home
                  </Typography>
                </NavLink>
                <NavLink to="/shop" style={NavLinkStyle}>
                  <Typography
                    sx={{
                      cursor: "pointer",
                      fontSize: ".9rem",
                      "&:hover": {
                        color: colors.amber,
                      },
                    }}
                  >
                    Shop
                  </Typography>
                </NavLink>
                <NavLink style={NavLinkStyle} to="/about">
                  <Typography
                    sx={{
                      cursor: "pointer",
                      fontSize: ".9rem",
                      "&:hover": {
                        color: colors.amber,
                      },
                    }}
                  >
                    About
                  </Typography>
                </NavLink>
                <NavLink style={NavLinkStyle} to="/contacts">
                  <Typography
                    sx={{
                      cursor: "pointer",
                      fontSize: ".9rem",
                      "&:hover": {
                        color: colors.amber,
                      },
                    }}
                  >
                    Contact us
                  </Typography>
                </NavLink>
              </Grid>

              <Grid item sx={cartStyle}>
                <NavLink to="/wishlist" style={NavLinkStyle}>
                  <AvtarWishlist />
                </NavLink>
                <NavLink to="/cart" style={NavLinkStyle}>
                  <AvtarCart />
                </NavLink>
                <NavLink
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    color: "inherit",
                  }}
                >

                  <UserDrawer />
                </NavLink>
              </Grid>

              <Grid item sx={hambergStyle}>
                <MenuDrawer
                  sx={{
                    display: {
                      sm: "block",
                      xs: "block",
                      lg: "none",
                      md: "none",
                      xl: "none",
                    },
                  }}
                />
              </Grid>
            </Grid>
          </StyledToolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Header;
