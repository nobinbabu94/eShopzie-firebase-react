import { Button, Grid, Paper, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { toast } from "react-toastify";

function AdminLogin() {
  const [ isloading,setIsLoading] = useState(false);

  const [error, setError] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let log = false;

  useEffect(() => {
    const adminToken = localStorage.getItem("admintokenId@#");

    if (adminToken) {
      navigate("/admin");
    }
  }, []);

  const onSubmit = async (data) => {
    const querrying = query(collection(db, "Admin"));
    const querySnapshot = await getDocs(querrying);
    const Querydata = querySnapshot.docs.map((doc) => ({
      // doc.data() is never undefined for query doc snapshots
      ...doc.data(),
      id: doc.id,
    }));
    Querydata.map((doc) => {
      if (doc.userName === data.email && doc.password === data.password) {
        log = true;
      }
    });

    if (log === true) {
      signInWithEmailAndPassword(auth, data.email, data.password).then(
        (userCredential) => {
          const user = userCredential.user;
          localStorage.setItem("admintokenId@#", user.accessToken);
          setIsLoading(false);
          toast.success("Login successfull");
          navigate("/admin");
        }
      );
    } else {
      setError("The password is invalid or the user is already in use");
    }
  };

  const paperStyle = {
    height: 500,
    width: 400,
    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(10deg,  #ADA996 10%, #F2F2F2 100%)",
  };
  return (
    <div>
      <form action="" onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          backgroundColor={{
            background: " linear-gradient(18deg, #36D1DC 20%, #5B86E5 100%)",
          }}
          height={840}
        >
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            xl={12}
            display="flex"
            flexDirection={"row"}
            marginTop={10}
            justifyContent="center"
          >
            <Paper elevation={10} style={paperStyle}>
              <h1 style={{ color: "red" }}>Admin Login</h1>
              <br />
              <TextField
                sx={{
                  width: { sm: 100, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 50,
                  },
                }}
                label="Email"
                placeholder="Enter your Eame"
                type="email"
                variant="standard"
                {...register("email", {
                  required: true,
                  pattern:
                    /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email && (
                <p style={{ color: "red", marginTop: 3, marginBottom: 2 }}>
                  Please check the Email
                </p>
              )}
              <br />
              <TextField
                sx={{
                  width: { sm: 100, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 50,
                  },
                }}
                label="password"
                placeholder="Enter your Password"
                type="password"
                variant="standard"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 10,
                })}
              />
              {errors.password && (
                <p style={{ color: "red" }}>Please check the Password</p>
              )}
              <br />
              <Button
                sx={{
                  width: { xs: 200, sm: 300, md: 300 },
                  "& .MuiInputBase-root": {
                    height: 50,
                  },
                }}
                type="submit"
                variant="contained"
                color="error"
              >
                Login
              </Button>
              <p style={{ color: "#b2102f" }}>{error}</p>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default AdminLogin;
