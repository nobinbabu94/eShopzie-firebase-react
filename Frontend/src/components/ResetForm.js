import { Button, Grid, Hidden, TextField, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config";
import Loader from "./Loader";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const ResetForm = () => {
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        setIsLoading(true)
        sendPasswordResetEmail(auth, data.emailid)
            .then(() => {
                setIsLoading(false)
                toast.success('Password reset email sent!');

                navigate('/login')

            })
            .catch((error) => {
                toast.error('wrong email!');
                setIsLoading(false)
            });
    }

    const parentStyle = {
        width: '100%', height: '600px',
    }
    const contaiStyle = {
        width: { xl: '60%', lg: '60%', md: '100%', sm: '80%', xs: '100%' },
        height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'
    }
    const imgStyle = {
        width: { xl: '50%', lg: '50%', },
    }

    const formStyle = {
        width: { xl: '50%', lg: '60%', md: '100%', sm: '100%', xs: '100%' },
        boxShadow: 2, height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', borderRadius: 5
    }
    return (
        <>
            {isLoading && <Loader />}
            <Grid sx={parentStyle}>

                <Container maxWidth='lg' sx={contaiStyle}>
                    <Hidden mdDown>

                        <Grid item sx={imgStyle}>
                            <img width='100%' src={require('../assets/forgot.png')} alt='' />

                        </Grid>
                    </Hidden>
                    <Grid item sx={formStyle}>
                        <Grid
                            item
                            sx={{
                                width: '100%', display: 'flex',
                                alignItems: 'center', justifyContent: 'center', flexDirection: 'column'
                            }}>
                            <Grid
                                component={'form'}
                                onSubmit={handleSubmit(onSubmit)}
                                sx={{
                                    width: '80%', display: 'flex', alignItems: 'center',
                                    justifyContent: 'center', flexDirection: 'column', gap: 2
                                }}
                                fullWidth
                            >
                                <h2>Reset Password</h2>
                                <TextField
                                    fullWidth
                                    type='email'
                                    placeholder="Email"
                                    {...register('emailid', { required: true },
                                        { pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/ })}
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

                                <Button
                                    variant='contained'
                                    type='submit'
                                    sx={{ textTransform: 'none' }}
                                    fullWidth
                                >
                                    Reset Password
                                </Button>
                            </Grid>
                            <Grid item sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                            }}
                                width='60%'
                            >
                                <Link to='/login'
                                    style={{ textDecoration: 'none' }} >
                                    <Typography sx={{ fontSize: '14px', }}
                                    >
                                        - Login
                                    </Typography>
                                </Link>
                                <Link to='/register'
                                    style={{ textDecoration: 'none' }}>
                                    <Typography sx={{ fontSize: '14px', }}
                                    >
                                        - Register
                                    </Typography>
                                </Link>
                            </Grid>
                        </Grid>

                    </Grid>

                </Container>
            </Grid>
        </>
    );
};

export default ResetForm;
