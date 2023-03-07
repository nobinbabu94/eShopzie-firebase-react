import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { colors } from "../Styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../redux/slice/cartSlice";
import ViewProductModal from "./ViewProductModal";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import {
  CALCULATE_TOTAL_WISHLIST_ITEMS,
  CALCULATE_WISHLIST_TOTAL_AMOUNT,
  DELETE_FROM_WISHLIST,
  selectwishlistItems,
} from "../redux/slice/WishlistSlice";

const WishlistProducts = () => {
  const wishlistItems = useSelector(selectwishlistItems);
  const dispatch = useDispatch();

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
    removeCartWishlistItem(product);
  };

  const removeCartWishlistItem = (product) => {
    dispatch(DELETE_FROM_WISHLIST(product));
  };

  useEffect(() => {
    dispatch(CALCULATE_TOTAL_WISHLIST_ITEMS());
    dispatch(CALCULATE_WISHLIST_TOTAL_AMOUNT());
  }, [dispatch, wishlistItems]);

  return (
    <>
      <Grid container direction="row" justifyContent="center" sx={{ pt: 5 }}>
        <Typography variant="h4" component={"h6"}>
          Wishlist
        </Typography>
      </Grid>
      {wishlistItems.length === 0 ? (
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
            <p>Wishlist is empty </p>
            <br />
            <Link to="/shop" style={{ textDecoration: "none", color: "blue" }}>
              &larr; Continue Shopping
            </Link>
          </Grid>
        </>
      ) : (
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center", p: 2 }}
        >
          {wishlistItems.map((product) => {
            return (
              <>
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <Card
                    sx={{
                      maxWidth: 280,
                      margin: "0 auto",
                      padding: "0.1em",
                      bgcolor: colors.grey100,
                      "&:hover": { boxShadow: 5 },
                    }}
                  >
                    <Box>
                      <IconButton
                        style={{ top: "0", right: "0" }}
                        onClick={() => removeCartWishlistItem(product)}
                      >
                        <CloseIcon />
                      </IconButton>
                    </Box>
                    <CardMedia
                      component="img"
                      height="250"
                      image={product.downloadURL}
                      alt={"alt"}
                      title={"titleasdasdsada"}
                      sx={{
                        padding: "1em 1em 1em 1em",
                        objectFit: "contain",
                        width: "86%",
                      }}
                    />
                    <Divider />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          display: "-webkit-box",
                          WebkitBoxOrient: "vertical",
                          WebkitLineClamp: 1,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {product.brand}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        &#8377;.{product.price}/-
                      </Typography>
                    </CardContent>
                    <CardActions
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "90%",
                      }}
                    >
                      <Avatar
                        sx={{ cursor: "pointer" }}
                        size="small"
                        onClick={() => {
                          addToCart(product);
                        }}
                      >
                        <AddShoppingCartIcon
                          sx={{ color: colors.blueGrey600 }}
                        />
                      </Avatar>
                      <Link to={`${product.id}`}>
                        <ViewProductModal product={product} id={product.id} />
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              </>
            );
          })}
        </Grid>
      )}
    </>
  );
};

export default WishlistProducts;
