import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase/config";

import {
  CALCULATE_SUBTOTAL,
  selectCartItems,
  selectcartTotalAmount,
  selectcartTotalQuantity,
} from "../redux/slice/cartSlice";
import { SAVE_BILLING_ADDRESS } from "../redux/slice/CheckoutSlice";
import { STORE_ORDERS } from "../redux/slice/OrderSlice";
import { colors } from "../Styles/theme";
import Loader from "./Loader";

const CheckoutDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const totalAmount = useSelector(selectcartTotalAmount);
  const totalItem = useSelector(selectcartTotalQuantity);
  const cartItems = useSelector(selectCartItems);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("usertoken");
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
  }, [dispatch, cartItems]);

  useEffect(() => {}, [totalAmount, totalItem]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    try {
      dispatch(SAVE_BILLING_ADDRESS(data));
      navigate("/checkout");
    } catch (error) {}
  };

  const getOrders = () => {
    setIsLoading(true);
    try {
      const orderRef = collection(db, "Orders");
      const q = query(orderRef, orderBy("createdAt"));

      onSnapshot(q, (snapshot) => {
        const allOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(allOrders);
        setIsLoading(false);
        dispatch(STORE_ORDERS(allOrders));
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // const filteredOrders = orders.filter((order) => order.userId === userId);
  // const adderssTaking = filteredOrders.map((order) => order.shippingAddress);

  return (
    <>
      {isLoading && <Loader />}
      <Grid sx={{ p: 3, display: "flex", justifyContent: "center" }}>
        <Typography variant="h5" component={"h6"}>
          {" "}
          Checkout details
        </Typography>
      </Grid>
      <Divider />
      {cartItems.length === 0 ? (
        <>
          <Grid
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              mt: 5,
            }}
          >
            <Typography variant="h6">- Nothing in your cart -</Typography>
            <Link to="/shop" style={{ textDecoration: "none", color: "blue" }}>
              &larr; continue shopping
            </Link>
          </Grid>
        </>
      ) : (
        <Grid
          container
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
            }}
          >
            <Grid sx={{ mb: 3, display: "flex", justifyContent: "left" }}>
              <Typography variant="h6" component={"h6"}>
                {" "}
                Shipping address
              </Typography>
            </Grid>
            <Grid
              sx={{
                width: "80%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
              component="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Typography>Recipient Name</Typography>
              <TextField
                fullWidth
                type="text"
                size="small"
                placeholder="Recipient Name"
                {...register("recepient", { required: true })}
              />
              {errors.recepient && errors.recepient.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Recipient Name is required.
                </p>
              )}
              <Typography>Address Line 1</Typography>
              <TextField
                type="text"
                fullWidth
                size="small"
                placeholder="Address Line 1"
                {...register("address1", { required: true })}
              />
              {errors.address1 && errors.address1.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Address is required.
                </p>
              )}
              <Typography>Address Line 2</Typography>
              <TextField
                type="text"
                fullWidth
                size="small"
                placeholder="Address Line 2"
                {...register(
                  "address2"
                  // { required: true }
                )}
              />

              <Typography>City</Typography>
              <TextField
                type="text"
                fullWidth
                size="small"
                placeholder="City"
                {...register("city", { required: true })}
              />
              {errors.city && errors.city.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  City is required.
                </p>
              )}
              <Typography>State</Typography>
              <TextField
                type="text"
                fullWidth
                size="small"
                placeholder="State"
                {...register("state", { required: true })}
              />
              {errors.state && errors.state.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  State is required.
                </p>
              )}
              <Typography>Postal code</Typography>
              <TextField
                type="tel"
                fullWidth
                size="small"
                placeholder="Postal code"
                {...register("pin", {
                  required: true,
                  pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
                })}
              />
              {errors.pin && errors.pin.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Postal code is required.
                </p>
              )}
              {errors.pin && errors.pin.type === "pattern" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Postal code should be number
                </p>
              )}
              <Typography>Country</Typography>
              <TextField
                type="text"
                fullWidth
                size="small"
                placeholder="Country"
                {...register("country", { required: true })}
              />
              {errors.country && errors.country.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Postal code is required.
                </p>
              )}
              <Typography>Phone Number</Typography>
              <TextField
                type="text"
                fullWidth
                size="small"
                placeholder="Phone Number"
                {...register("phone", { required: true })}
              />
              {errors.phone && errors.phone.type === "required" && (
                <p
                  style={{
                    padding: 0,
                    margin: 0,
                    fontSize: ".8em",
                    color: "red",
                  }}
                >
                  Phone number is required.
                </p>
              )}
              <Button
                sx={{ mt: 3 }}
                variant="contained"
                fullwidth
                type="submit"
              >
                Proceed to checkout
              </Button>
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
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              p: 3,
            }}
          >
            <Grid sx={{ mb: 3, display: "flex", justifyContent: "left" }}>
              <Typography variant="h6" component={"h6"}>
                {" "}
                Checkout summary
              </Typography>
            </Grid>

            <Grid
              sx={{
                width: "50%",
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
                {cartItems.map((item, index) => {
                  const { id, name, price, cartQuantity } = item;
                  return (
                    <>
                      <Grid
                        key={id}
                        sx={{
                          width: "100%",
                          boxShadow: 2,
                          border: 1,
                          p: 1,
                          gap: 1,
                          m: 1,
                        }}
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
              <Link
                to="/cart"
                style={{ textDecoration: "none", color: "blue" }}
              >
                &larr; Back to cart
              </Link>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default CheckoutDetails;
