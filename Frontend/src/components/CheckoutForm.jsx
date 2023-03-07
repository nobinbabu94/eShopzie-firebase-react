import React, { useEffect, useState } from "react";

import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { Button, Grid, LinearProgress, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  CLEAR_CART,
  selectCartItems,
  selectcartTotalAmount,
  selectcartTotalQuantity,
} from "../redux/slice/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { colors } from "../Styles/theme";

import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../firebase/config";
import { selectEmail, selectUserId } from "../redux/slice/AuthSlice";
import { selectBillingAddress } from "../redux/slice/CheckoutSlice";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const totalItem = useSelector(selectcartTotalQuantity);
  const totalAmount = useSelector(selectcartTotalAmount);
  const cartItems = useSelector(selectCartItems);
  const userId = useSelector(selectUserId);
  const userEmail = useSelector(selectEmail);
  const billingAddress = useSelector(selectBillingAddress);

  const dispatch = useDispatch();

  const [ setEmail] = useState("");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
  }, [stripe]);
  const saveOrder = () => {
    const today = new Date();

    const date = today.toDateString();
    const time = today.toLocaleTimeString();
    const orderConfig = {
      userId,
      userEmail,
      orderDate: date,
      oederTime: time,
      orderAmount: totalAmount,
      orderStatus: "Order placed...",
      cartItems,
      shippingAddress: billingAddress,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "Orders"), orderConfig);
      dispatch(CLEAR_CART());
      navigate("/checkout-success");
      toast.success("Order saved");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const confirmPayment = await stripe
      .confirmPayment({
        elements,
        confirmParams: {
          // Make sure to change this to your payment completion page
          return_url: "http://localhost:3000/checkout-success",
        },
        redirect: "if_required",
      })
      .then((result) => {
        if (result.error) {
          setIsLoading(false);
          toast.error(result.error.message);
          setMessage(result.message.error);

          return;
        }
        if (result.paymentIntent) {
          if (result.paymentIntent.status === "succeeded") {
            setIsLoading(false);
            toast.success("Payment successful");
            saveOrder();
          }
        }
      });

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs",
  };

  return (
    <>
      <Grid sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
        <Typography variant="h4">Checkout</Typography>
      </Grid>

      <Grid
        container
        sx={{ width: "100%" }}
        component={"form"}
        onSubmit={handleSubmit}
      >
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            width: "50%",
            // bgcolor: "green",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
          }}
        >
          <Grid sx={{ mb: 3, display: "flex", justifyContent: "left" }}>
            <Typography variant="h5" component={"h6"}>
              {" "}
              Checkout summary
            </Typography>
          </Grid>

          <Grid
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
            }}
          >
            <Typography>Cart items : {totalItem?.toFixed(2)} </Typography>
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="h6" component={"h6"}>
                Subtotal :
              </Typography>
              <Typography
                variant="h6"
                component={"h6"}
                sx={{ color: colors.orange }}
              >
                &#8377;.{totalAmount?.toFixed(2)}
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                flexDirection: "column",
                boxShadow: 2,
              }}
            >
              <Grid
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: 2,
                }}
              >
                {cartItems.map((item, index) => {
                  const {  name, price, cartQuantity } = item;
                  return (
                    <>
                      <Grid
                        sx={{ boxShadow: 2, border: 1, p: 1, gap: 1, m: 1 }}
                      >
                        <Typography variant="h6" component={"h6"} key={item.id}>
                          Product:{name}
                        </Typography>
                        <Typography>Quantity: {cartQuantity} </Typography>
                        <Typography>Unit price: &#8377;.{price}.00 </Typography>
                        <Typography>
                          Total price: &#8377;.{price * cartQuantity}.00
                        </Typography>
                      </Grid>
                    </>
                  );
                })}
              </Grid>
            </Grid>
            <Link
              to="/checkout-details"
              style={{ textDecoration: "none", color: "blue" }}
            >
              &larr; Edit Billing details
            </Link>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={6}
          lg={6}
          xl={6}
          sx={{
            width: "50%",
            // bgcolor: "green",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 3,
          }}
        >
          <Typography sx={{ mb: 3 }} variant="h5">
            Stripe Summary
          </Typography>
          <Grid
            sx={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              boxShadow: 3,
              p: 2,
            }}
          >
            <LinkAuthenticationElement
              id="link-authentication-element"
              onChange={(e) => setEmail(e.target.value)}
            />
            <PaymentElement
              id="payment-element"
              options={paymentElementOptions}
            />
            <Button variant="contained">
              <button disabled={isLoading || !stripe || !elements} id="submit">
                <span id="button-text">
                  {isLoading ? (
                    <Box sx={{ display: "flex" }}>
                      {" "}
                      <LinearProgress />
                    </Box>
                  ) : (
                    "Pay now"
                  )}
                </span>
              </button>
            </Button>
            {/* Show any error or success messages  */}
            {message && <div id="payment-message">{message}</div>}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default CheckoutForm;
