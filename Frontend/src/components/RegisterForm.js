import { Button, Grid, Hidden, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db, } from "../firebase/config";
import Loader from "./Loader";
import { doc, setDoc, Timestamp } from "firebase/firestore";



const RegisterForm = () => {

  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const parentStyle = {
    width: "100%",
    height: "600px",

  };

  const onSubmit = (data) => {
    if (data.psdno === data.psdconfirm) {

      setIsLoading(true)
      createUserWithEmailAndPassword(auth, data.emailid, data.psdno)

        .then((userCredential) => {
          const user = userCredential.user;
          setDoc(doc(db, "Users", user.uid), {
            name: user.displayName,
            email: user.email,
            timestamp: Timestamp.now().toDate(),
          });
          setIsLoading(false)
          toast.success('Registration successfull')
          setTimeout(() => {
            navigate('/login')
          }, 1000);
        })
        .catch((error) => {
          toast.error(error.message)
          setIsLoading(false)
        });
    }
    else {
      toast.error('Password do not match')
    }


  }
  return (
    <>
      {isLoading && <Loader />}
      <Grid sx={parentStyle}>
        <Container
          maxWidth="lg"
          sx={{
            width: { xl: '80%', lg: '70%', md: '100%', sm: '80%', xs: '100%' },
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Grid item
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
            <Grid item onSubmit={handleSubmit(onSubmit)} component={'form'}
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
              <h2>Register</h2>
              <TextField
                type="email"
                placeholder="Email"
                fullWidth
                size="small"
                {...register('emailid', { required: true }, { pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}

              />
              {errors.emailid && errors.emailid.type === "required" && (
                <p style={{ padding: 0, margin: 0, fontSize: ".8em", color: 'red', }}
                >
                  Email is required.
                </p>
              )}
              {errors.emailid && errors.emailid.type === "pattern" && (
                <p style={{ padding: 0, margin: 0, fontSize: ".8em", color: 'red', }}
                >
                  Email is not valid.
                </p>
              )}

              <TextField
                type="password"
                placeholder="Password"
                fullWidth
                size="small"
                {...register('psdno', { required: true }, { pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
              />
              {errors.psdno && errors.psdno.type === "required" && (
                <p style={{ padding: 0, margin: 0, fontSize: ".8em", color: 'red', }}
                >
                  Password is required.
                </p>
              )}
              <TextField
                type="password"
                placeholder="Confirm Password"
                fullWidth
                size="small"
                {...register('psdconfirm', { required: true }, { pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
              />
              {errors.psdconfirm && errors.psdconfirm.type === "required" && (
                <p style={{ padding: 0, margin: 0, fontSize: ".8em", color: 'red', }}>Confirm password is required.</p>
              )}
              <Button
                variant="contained"
                sx={{ mt: 1, textTransform: "none" }}
                fullWidth
                type='submit'
              >
                Register
              </Button>

              <Grid item
                sx={{
                  display: "flex",
                  justifyContent: 'center',
                  width: "100%",
                }}
              >
                <Typography>Alerady have an account?</Typography>
                <Link to='/login'><Typography>Login</Typography></Link>
              </Grid>

            </Grid>

          </Grid>
          <Hidden mdDown>
            <Grid
              sx={{
                width: "40%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Grid item
                sx={{
                  gap: 2,
                  width: "100%", display: "flex",
                  alignItems: 'center'
                }}
              >
                <img
                  width="100%"
                  src={require("../assets/register.png")}
                  alt=""
                />
              </Grid>
            </Grid>
          </Hidden>
        </Container>
      </Grid>
    </>
  )
};

export default RegisterForm;
