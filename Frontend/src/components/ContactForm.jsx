import { Button, Grid, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState, useRef } from "react";

import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Loader from "./Loader";

import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import TwitterIcon from "@mui/icons-material/Twitter";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const parentStyle = {
    width: "100%",
    height: "auto",
    p: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const onSubmit = (data) => {
    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        // "service_jffoeli",
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        // "template_wlcgetv",
        form.current,
        "HDoGyJI6KBTYJNXt9"
      )
      .then(
        (result) => {
          setIsLoading(true);
          toast.success("Sent successfully");
          setIsLoading(false);
        },
        (error) => {
          setIsLoading(false);

          toast.error(error.text);
        }
      );
    reset();
  };
  return (
    <>
      {isLoading && <Loader />}
      <Grid sx={parentStyle} container>
        {/* <Container
          maxWidth="lg"
          sx={{
            width: { xl: "80%", lg: "70%", md: "100%", sm: "80%", xs: "100%" },
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        > */}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{
              width: "50%",
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
              onSubmit={handleSubmit(onSubmit)}
              component={"form"}
              ref={form}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                mb: 5,
                textAlign: "center",
                width: {
                  xl: "70%",
                  lg: "70%",
                  md: "80%",
                  sm: "70%",
                  xs: "80%",
                },
              }}
            >
              <Typography variant="h4">Contact us</Typography>
              <Typography>
                We will revert you upon receiving this form.
              </Typography>

              <TextField
                type="text"
                placeholder="Name"
                fullWidth
                size="small"
                {...register("user_name", { required: true })}
              />
              {errors.nameofUser && errors.nameofUser.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Field is required.
                </p>
              )}
              <TextField
                type="email"
                placeholder="Email"
                fullWidth
                size="small"
                {...register(
                  "user_email",
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
                type="text"
                placeholder="Subject"
                fullWidth
                size="small"
                {...register("subject", { required: true })}
              />
              {errors.subject && errors.subject.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Field is required.
                </p>
              )}
              <TextField
                sx={{ width: "100%" }}
                type="text"
                placeholder="Your Message"
                multiline
                minRows={6}
                maxRows={20}
                size="large"
                {...register("message", { required: true })}
              />
              {errors.message && errors.message.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Field is required.
                </p>
              )}
              <Button
                variant="contained"
                sx={{ mt: 1, textTransform: "none" }}
                fullWidth
                type="submit"
              >
                Send Message
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{
              width: "50%",
              height: "36rem",
              // bgcolor: "blue"
              display: "flex",
            }}
          >
            <Grid
              sx={{
                gap: 2,
                mt: 5,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  gap: 2,
                }}
              >
                Contact information
              </Typography>

              <Typography
                sx={{
                  display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  gap: 2,
                }}
              >
                <EmailIcon />
                support@ehhopzie.com
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  gap: 2,
                }}
              >
                <CallIcon /> +91 1234567890
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  gap: 2,
                }}
              >
                <LocationOnIcon />
                Edapally, Ernakulam, Kerala
              </Typography>
              <Typography
                sx={{
                  display: "flex",
                  //   alignItems: "center",
                  //   justifyContent: "center",
                  gap: 2,
                }}
              >
                <TwitterIcon sx={{ color: "#2196f3" }} />{" "}
                <FacebookIcon sx={{ color: "#0d47a1" }} />{" "}
                <InstagramIcon
                  sx={{
                    color: "rgb(228, 64, 95)",
                  }}
                />
              </Typography>
            </Grid>
          </Grid>
        {/* </Container> */}
      </Grid>
    </>
  );
};

export default ContactForm;
