import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Container,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { Button, Grid, } from "@mui/material";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";
import {
  ADD_TO_CART,
  CALCULATE_TOTAL_ITEMS,
  DECREASE_CART,
  selectCartItems,
} from "../redux/slice/cartSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { colors } from "../Styles/theme";
import { useParams } from "react-router-dom";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import StarsRating from "react-star-rate";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xl: "50vw", md: "55vw", lg: "60vw", sm: "70vw", xs: "80vw" },
  height: "70vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 2,
};

export default function ViewProductModal({ product }) {
  const [open, setOpen] = useState(false);
  const [getReview, setGetReview] = useState([]);


  const handleOpen = () => {
    setOpen(true);
  };
  const dispatch = useDispatch();
  const handleClose = () => setOpen(false);
  const { id } = useParams();
  const cartItems = useSelector(selectCartItems);
 

  const getReviews = () => {
    try {
      const orderRef = collection(db, "Reviews");

      onSnapshot(orderRef, (snapshot) => {
        const allOrders = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setGetReview(allOrders);
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  const filteredReviews = getReview.filter((item) => item.productId === id);


  const cart = cartItems.find((cart) => cart.id === id);


  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_ITEMS());
  };

  const decreaseCart = (product) => {
    dispatch(DECREASE_CART(product));
    dispatch(CALCULATE_TOTAL_ITEMS());
  };

  const parentStyle = {
    width: "100%",
    height: "auto",
    p: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
 
  return (
    <div>
      <Tooltip title="View Product">
        {/* <Avatar onClick={handleOpen} size="small" sx={{ cursor: "pointer" }}> */}
          <VisibilityIcon  onClick={handleOpen}/>
        {/* </Avatar> */}
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box>
            <IconButton
              style={{ position: "absolute", top: "0", right: "0" }}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Grid sx={parentStyle}>
            <Container
              maxWidth="lg"
              sx={{
                width: {
                  xl: "100%",
                  lg: "100%",
                  md: "100%",
                  sm: "100%",
                  xs: "100%",
                },
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Grid
                item
                sx={{
                  width: {
                    xl: "50vw",
                    lg: "60vw",
                    md: "60vw",
                    sm: "90vw",
                    xs: "90vw",
                  },
                  boxShadow: 1,
                  borderRadius: 5,

                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  component={"form"}
                  onSubmit={"handleSubmit(onSubmit)"}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 0,
                    mb: 2,
                    p: 2,
                    textAlign: "center",
                    width: {
                      xl: "50vw",
                      lg: "50vw",
                      md: "50vw",
                      sm: "70vw",
                      xs: "70vw",
                    },
                  }}
                >
                  <Grid
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      p: 0,
                      mb: 5,
                    }}
                  >
                    <h2>Product details</h2>
                    <Typography
                      onClick={() => {
                        handleClose();
                      }}
                      sx={{ cursor: "pointer" }}
                    >
                      &larr; back to shop
                    </Typography>
                  </Grid>

                  <Grid
                    container
                    sx={{
                      width: " 100%",
                      mt: 1,
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                    }}
                  >
                    <Grid
                      item
                      sx={{ width: "100%", boxShadow: 2 }}
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      xl={4}
                    >
                      <img width={"100%"} src={product?.downloadURL} alt="#" />
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={4}
                      lg={4}
                      xl={4}
                      sx={{
                        width: "50%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        gap: 0,
                        textAlign: "left",
                      }}
                    >
                      <Typography variant="h5" component="h2">
                        {product.name}
                      </Typography>
                      <Typography>Brand: {product.brand}</Typography>
                      <Typography>Category: {product.category}</Typography>
                      <Typography
                        variant="h6"
                        component="h2"
                        sx={{ color: "red" }}
                      >
                        &#8377;.{product.price}.00
                      </Typography>
                      <Typography>{product.description}</Typography>

                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          mt: 3,
                        }}
                      >
                        {cart?.cartQuantity ? (
                          <>
                            <Button onClick={() => decreaseCart(product)}>
                              -
                            </Button>
                            <Typography>{cart?.cartQuantity}</Typography>
                            <Button onClick={() => addToCart(product)}>
                              +
                            </Button>
                          </>
                        ) : (
                          ""
                        )}
                      </Grid>

                      <Button
                        variant="contained"
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        Add to Cart
                      </Button>

                      {/* <Typography variant="h5" component="h2">{product.name}</Typography> */}
                      {cart?.cartQuantity ? (
                        <>
                          <Link
                            to="/cart"
                            style={{
                              color: colors.darkBlue,
                              textDecoration: "none",
                            }}
                          >
                            <Typography>&larr; continue to cart</Typography>
                          </Link>
                        </>
                      ) : (
                        ""
                      )}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Grid>

          <Grid >
            <Typography variant="h6">Product Reviews</Typography>
            <Typography >{filteredReviews.length} Reviews</Typography>
            {filteredReviews.length === 0 ? (
              <Typography sx={{display:'flex', flexDirection:'column',p:{xs:0,sm:0,md:3}}}>No reviews yet</Typography>
            ) : (
              <>
                {filteredReviews.map((item, index) => {
                  const { rate, review, reviewDate, userName } = item;
                  return (
                    <Grid sx={{display:'flex', flexDirection:'column',p:{xs:0,sm:0,md:3}}}>
                      <StarsRating value={rate} />
                      <Typography>{review}</Typography>
                      <Typography>{userName.replace(/^(.{3})[^@]+/, "$1XXX")}</Typography>
                      <Typography>{reviewDate}</Typography>
                    </Grid>
                  );
                })}
              </>
            )}
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
