import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../firebase/config";
import { colors } from "../Styles/theme";
import ViewProductModal from "./ViewProductModal";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useDispatch } from "react-redux";
import { ADD_TO_CART } from "../redux/slice/cartSlice";
import { ADD_TO_WISHLIST } from "../redux/slice/WishlistSlice";
import Loader from "./Loader";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const RecentlyAddedProducts = () => {
  const [productdata, setProductdata] = useState([]);
  const [visible, setVisible] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const productArray = [];

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "Products"));

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          productArray.push({
            ...data,
            id: doc.id,
          });
          setIsLoading(false);
        });
        setProductdata(productArray);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    })();
  }, []);

  // var items = productdata.slice(0, 5);
  //show only first 5 items for that slice method above

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  const addToWishlist = (product) => {
    dispatch(ADD_TO_WISHLIST(product));
  };

  const showMore = () => {
    setVisible((prevValue) => prevValue + 4);
  };

  return (
    <>
      {isLoading && <Loader />}
      <Grid>
        <Grid
          container
          width="100%"
          spacing={3}
          sx={{ display: "flex", justifyContent: "center", p: 2 }}
        >
          {productdata.slice(0, visible).map((product) => {
            return (
              <Grid item xs={12} sm={6} md={2.5} lg={2.5} xl={2.5} py={2.5}>
                <Card
                  disableRippl
                  sx={{
                    maxWidth: 280,
                    margin: "0 auto",
                    padding: "0.1em",
                    bgcolor: "white",
                    "&:hover": {
                      transitionDelay: "1s",
                      transform: "scale3d(1.05, 1.05, 1.05)",
                    },
                  }}
                >
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="260"
                      image={product.downloadURL}
                      backgroundImage={
                        "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5))"
                      }
                      alt={product.name}
                      sx={{
                        bgcolor: "white",
                        "&:hover": {
                          filter:
                            "invert(9%)  saturate(100%) brightness(85%) contrast(148%)",
                          transform: "scale3d(1.05, 1.05, 1.05)",
                        },
                      }}
                    />
                    <Divider />
                    <CardContent>
                      <Typography
                        variant="body2"
                        color={colors.darkBlue}
                        noWrap
                        gutterBottom
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
                      <Typography variant="body2" color={colors.darkBlue}>
                        {product.brand}
                      </Typography>
                      <Typography variant="body2" color={colors.darkBlue}>
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
                      {/* <Avatar
                        sx={{ cursor: "pointer" }}
                        size="small"
                        onClick={() => {
                          addToCart(product);
                        }}
                      > */}
                      <AddShoppingCartIcon
                        onClick={() => {
                          addToCart(product);
                        }}
                        sx={{ color: colors.blueGrey600 }}
                      />
                      {/* </Avatar> */}
                      <Link to={`${product.id}`}>
                        <ViewProductModal product={product} id={product.id} />
                      </Link>
                      {/* <Avatar
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          addToWishlist(product);
                        }}
                      > */}
                      <FavoriteBorderIcon
                        onClick={() => {
                          addToWishlist(product);
                        }}
                        sx={{ color: colors.lightred }}
                      />
                      {/* </Avatar> */}
                    </CardActions>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
        {productdata.length > 5 ? (
          <Grid
            sx={{
              display: "flex",
              aligItems: "center",
              justifyContent: "center",
            }}
          >
            <Button
              sx={{ bgcolor: colors.darkBlue, color: "white", '&:hover':{bgcolor:colors.darkBlue} }}
              onClick={showMore}
            >
              Show more <ArrowDropDownIcon />
            </Button>
          </Grid>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
};

export default RecentlyAddedProducts;
