import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import {
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_ITEMS,
  selectCartItems,
  selectcartTotalAmount,
} from "../redux/slice/cartSlice";
import { selectEmail } from "../redux/slice/AuthSlice";
import { selectBillingAddress } from "../redux/slice/CheckoutSlice";
import { toast } from "react-toastify";
import CheckoutForm from "./CheckoutForm";
import { useNavigate } from "react-router-dom";

//insert your config file path here

const BASE_URL = process.env.REACT_APP_STRIPE_PK;

const Checkout = () => {
  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

  const [clientSecret, setClientSecret] = useState("");
  const [message, setMessage] = useState("Initializing Checkout...");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const totalAmount = useSelector(selectcartTotalAmount);
  const customerEmail = useSelector(selectEmail);
  const billingAddress = useSelector(selectBillingAddress);

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_ITEMS());
  }, [dispatch, cartItems]);

  useEffect(() => {
    const userToken = localStorage.getItem("usertoken");
    if (!userToken) {
      navigate("/login");
    }
  }, []);

  const description = `wShop payment : email: ${customerEmail}, amount: ${totalAmount}`;

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("http://localhost:4242/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cartItems,
        userEmail: customerEmail,
        billing: billingAddress,
        description,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then((json) => Promise.reject(json));
      })
      .then((data) => {
        setClientSecret(data.clientSecret);
      })
      .catch((error) => {
        setMessage("Failed to initialise checkout !");
        toast.error("Something went wrong !");
      });
  }, []);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };
  return (
    <>
      <Grid container>
        <Grid>
          {!clientSecret && <Typography variant="h5">{message}</Typography>}
        </Grid>
      </Grid>
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
};

export default Checkout;
