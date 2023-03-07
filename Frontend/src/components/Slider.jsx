import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { colors } from "../Styles/theme";
import ShowLogin, { ShowLogOut } from "./HiddenLink";
import { motion } from "framer-motion";

const Slider = () => {
  const parentStyle = {
    height: "100%",
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    overflow: "hidden",
    backgroundImage: "url('https://wallpaperaccess.com/full/2677222.jpg') ",
  };
  return (
    <>
      <Grid sx={parentStyle}>
        <Grid
          sx={{
            width: "100%",
            height: "560px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <motion.div
            style={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                minHeight: 180,
                minWidth: 200,
                bgcolor: "rgba(37, 41, 88, 0.5)",
                gap: 3,
                boxSizing: "border-box",
                p: 3,
              }}
            >
              <Grid
                sx={{
                  width: "100%",
                  height: "80%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <motion.div
                  style={{ y: 20 }}
                  animate={{ y: -10 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <Grid sx={{ display: "flex" }}>
                    <Typography
                      sx={{
                        color: colors.amber,
                        fontSize: "1.5em",
                        textShadow: 5,
                      }}
                    >
                      eSho
                    </Typography>
                    <Typography
                      sx={{ color: "white", fontSize: "1.5em", textShadow: 5 }}
                    >
                      pzie
                    </Typography>
                  </Grid>
                </motion.div>
                <Typography
                  no
                  sx={{
                    color: "white",
                    fontSize: "2em",
                    display: "flex",
                    justifyContent: "center",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                  }}
                >
                  Finding the best gadgets, so you don't have to...
                </Typography>
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1em",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                  }}
                >
                  Shop all of your technology needs here.
                </Typography>
              </Grid>

              <Grid
                sx={{
                  width: "100%",
                  height: "20%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <ShowLogOut>
                  <Link to="/signup" style={{ textDecoration: "none" }}>
                    <Button variant="contained" sx={{ textTransform: "none" }}>
                      Signup
                    </Button>
                  </Link>
                </ShowLogOut>
                <ShowLogin>
                  <Link to="/shop" style={{ textDecoration: "none" }}>
                    <Button
                      variant="contained"
                      sx={{
                        textTransform: "none",
                        "&:hover": { transform: "scale3d(1.05, 1.05, 1.05)" },
                      }}
                    >
                      Shop
                    </Button>
                  </Link>
                </ShowLogin>
              </Grid>
            </Box>
          </motion.div>
        </Grid>
      </Grid>
    </>
  );
};

export default Slider;
