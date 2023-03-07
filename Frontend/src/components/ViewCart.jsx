import {
  Button,
  Card,
  CardContent,
  Grid,
  Hidden,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_ITEMS,
  CLEAR_CART,
  DECREASE_CART,
  DELETE_FROM_CART,
  selectCartItems,
  selectcartTotalAmount,
  selectcartTotalQuantity,
} from "../redux/slice/cartSlice";
import { colors } from "../Styles/theme";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: theme.palette.common.black,
    fontSize: "1.1em",
    borderColor: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ViewCart = () => {
  //   const [isLoading, setIsLoading] = useState(false);
  const cartTotalAmount = useSelector(selectcartTotalAmount);
  const cartTotalQuantity = useSelector(selectcartTotalQuantity);
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART(cart));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART(cart));
  };

  const deleteFromCart = (cart) => {
    dispatch(DELETE_FROM_CART(cart));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_ITEMS());
  }, [dispatch, cartItems]);

  return (
    <>
      {/* {isLoading && <Loader />} */}
      <Grid container direction="row" justifyContent="center" sx={{ pt: 5 }}>
        <Typography variant="h4" component={"h6"}>
          Shopping cart
        </Typography>
      </Grid>
      {cartItems.length === 0 ? (
        <>
          <Grid
            container
            sx={{
              display: "flex",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Shoping cart is empty </p>
            <br />
            <Link to="/shop" style={{ textDecoration: "none", color: "blue" }}>
              &larr; Continue Shopping
            </Link>
          </Grid>
        </>
      ) : (
        <>
          <Grid container direction="column" sx={{ gap: 2, p: 2 }}>
            <Grid item sx={{ width: "100%", height: "auto" }}>
              <TableContainer component={Paper}>
                <Table aria-label="customized table">
                  <TableHead>
                    <TableRow sx={{ border: 1 }}>
                      <StyledTableCell align="center">sl no</StyledTableCell>
                      <StyledTableCell align="center">Product </StyledTableCell>
                      <Hidden mdDown>
                        <StyledTableCell align="center">Price</StyledTableCell>
                      </Hidden>
                      <StyledTableCell align="center">Quantity</StyledTableCell>
                      <StyledTableCell align="center">Total</StyledTableCell>
                      <Hidden mdDown>
                        <StyledTableCell align="center">
                          Actions
                        </StyledTableCell>
                      </Hidden>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cartItems.map((cart, index) => {
                      const { id, name, price, downloadURL, cartQuantity } =
                        cart;
                      return (
                        <StyledTableRow
                          key={id}
                          sx={{ "&:hover": { boxShadow: 2 } }}
                        >
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {/* <IconButton
                                width="100%"
                                style={{ top: "0", right: "0",  zIndez:'7 !important',    position: 'fixed',
                              }}
                                onClick={() => deleteFromCart(cart)}
                              >
                                <CloseIcon />
                              </IconButton> */}

                            {index + 1}
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              textAlign: "center",
                            }}
                          >
                            {name}
                            <img src={downloadURL} alt="#" width={70} />
                          </StyledTableCell>
                          <Hidden mdDown>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              &#8377;.{price}.00
                            </StyledTableCell>
                          </Hidden>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            <Grid>
                              <Grid item >
                                <Button onClick={() => decreaseCart(cart)}>
                                  -
                                </Button>
                              </Grid>
                              <Grid item>{cartQuantity}</Grid>
                              <Grid item>
                                <Button onClick={() => increaseCart(cart)}>
                                  +
                                </Button>
                              </Grid>
                            </Grid>
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            &#8377;.{(price * cartQuantity).toFixed(2)}
                          </StyledTableCell>
                          <Hidden mdDown>
                            <StyledTableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              <Button
                                sx={{
                                  textTransform: "none",
                                  color: colors.darkred,
                                }}
                                onClick={() => deleteFromCart(cart)}
                              >
                                Remove
                              </Button>
                            </StyledTableCell>
                          </Hidden>
                        </StyledTableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid
            container
            sx={{
              p: 4,
              display: "flex",
              justifyContent: {
                xl: "space-between",
                lg: "space-between",
                md: "space-between",
                sm: "center",
                xs: "center",
              },
            }}
          >
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Button variant="contained" onClick={() => clearCart()}>
                Clear cart
              </Button>
            </Grid>
            <Grid item sx={{ p: 4, display: "flex", flexDirection: "column" }}>
              <Card sx={{ p: 1, width: "100" }}>
                <CardContent>
                  <Link
                    to="/shop"
                    style={{ textDecoration: "none", color: "blue" }}
                  >
                    &larr; Continue Shopping
                  </Link>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 3 }}
                  >
                    Cart items {cartTotalQuantity}.00
                  </Typography>
                  <Grid
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h2>Subtotal</h2>
                    <h2>&#8377;.{cartTotalAmount}</h2>
                  </Grid>
                  <Grid sx={{ display: "flex", justifyContent: "right" }}>
                    <Link
                      to="/checkout-details"
                      style={{ textDecoration: "none" }}
                    >
                      <Button variant="contained">Checkout</Button>
                    </Link>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </>
      )}
    </>
  );
};

export default ViewCart;
