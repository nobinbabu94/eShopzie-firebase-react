import { Button, Grid, Hidden, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Loader from "./Loader";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db, } from "../firebase/config";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, data.emailid, data.psdno)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('usertoken', user.accessToken)
        setIsLoading(false);
        toast.success("Login successfull");
        navigate("/");

      })
      .catch((error) => {
        toast.error(error.message);
        setIsLoading(false);
      });
  };


  const provider = new GoogleAuthProvider();
  const signInWithGoogle = () => {

    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setDoc(doc(db, "Users", user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: Timestamp.now().toDate(),
        });
        //  setDoc(doc(db, "Users"), {
        //   name: user.displayName,
        //   email: user.email,
        //   timestamp: Timestamp.now().toDate(),
          
        // });
        localStorage.setItem('usertoken', user.accessToken);
        toast.success("Login successfull");
        setTimeout(() => {
          navigate("/");
        }, 1000);

      })
      .catch((error) => {
        toast.error(error);
      });
  };

  const parentStyle = {
    width: "100%",
    height: "600px",
  };

  return (
    <>
      {isLoading && <Loader />}
      <Grid sx={parentStyle}>
        <Container
          maxWidth="lg"
          sx={{
            width: { xl: "80%", lg: "70%", md: "100%", sm: "80%", xs: "100%" },
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
          }}
        >
          <Hidden mdDown>
            <Grid
              sx={{
                width: {
                  xl: "40%",
                  lg: "40%",
                  md: "40%",
                  sm: "100%",
                  xs: "100%",
                },
                boxShadow: 1,
                borderRadius: 5,
                height: "auto",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid
                item
                sx={{
                  gap: 2,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img width="100%" src={require("../assets/login.png")} alt="" />
              </Grid>
            </Grid>
          </Hidden>

          <Grid
            item
            sx={{
              width: {
                xl: "40%",
                lg: "40%",
                md: "40%",
                sm: "100%",
                xs: "100%",
              },
              boxShadow: 1,
              borderRadius: 5,
              height: "auto",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Grid
              item
              component={"form"}
              onSubmit={handleSubmit(onSubmit)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 1, mb: 5,
                width: {
                  xl: "70%",
                  lg: "70%",
                  md: "80%",
                  sm: "70%",
                  xs: "80%",
                },
              }}
            >
              <h2>Login</h2>
              <TextField
                type="email"
                placeholder="Email"
                fullWidth
                {...register(
                  "emailid",
                  { required: true },
                  { pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ }
                )}
              />

              {errors.emailid && errors.emailid.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Email is required.
                </p>
              )}
              {errors.emailid && errors.emailid.type === "pattern" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Email is not valid.
                </p>
              )}
              <TextField
                type="password"
                placeholder="Password"
                fullWidth
                {...register("psdno", { required: true })}
              />

              {errors.psdno && errors.psdno.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Password is required.
                </p>
              )}
              <Button
                variant="contained"
                sx={{ mt: 1, textTransform: "none" }}
                fullWidth
                type="submit"
              >
                Submit
              </Button>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Link to={"/reset"}>
                  <Typography>Forget Password?</Typography>
                </Link>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                }}
              >
                <Typography>-- or --</Typography>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: "#e65100",
                    textTransform: "none",
                    "&:hover": {
                      backgroundColor: "#e65100",
                    },
                  }}
                  fullWidth
                  onClick={signInWithGoogle}
                >
                  <GoogleIcon sx={{ fontSize: "medium" }} /> Login with Google
                </Button>
              </Grid>
              <Grid
                item
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Typography>Dont have an account?</Typography>
                <Link to="/register">
                  <Typography>Register</Typography>

                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </>
  );
};

export default LoginForm;
