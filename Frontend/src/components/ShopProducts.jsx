import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { db } from "../firebase/config";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { colors } from "../Styles/theme";
import { toast } from "react-toastify";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { ADD_TO_CART } from "../redux/slice/cartSlice";
import ViewProductModal from "./ViewProductModal";
import { Link } from "react-router-dom";
import { ADD_TO_WISHLIST } from "../redux/slice/WishlistSlice";
import ViewCozyIcon from "@mui/icons-material/ViewCozy";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Slider from "@mui/material/Slider";
import {
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  FILTER_BY_SEARCH,
  FILTER_SUGGEST,
  selectFilterProduct,
  selectSuggestion,
  SORT_PRODUCTS,
  SUGGEST_EMPTY,
  SUGGEST_SEARCH,
} from "../redux/slice/filterSlice";
import { GET_PRICE_RANGE, selectMaxPrice } from "../redux/slice/ProductSlice";
import { motion } from "framer-motion";

function valuetext(value) {
  return `${value}`;
}

const ShopProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");
  const productArray = [];
  const categoryArray = [];
  const [productdata, setProductdata] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [value, setValue] = useState(0);
  const [catValue, setCatValue] = useState("");
  const [sort, setSort] = useState("Latest");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const filterProducts = useSelector(selectFilterProduct);
  const suggestionBox = useSelector(selectSuggestion);
  const maxPrices = useSelector(selectMaxPrice);
  const dispatch = useDispatch();
  const suggestionRef = useRef();


  useEffect(() => {
    dispatch(FILTER_BY_CATEGORY({ catValue, productdata }));
  }, [dispatch, catValue, productdata]);

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ sort, productdata }));
  }, [dispatch, sort, productdata]);

  useEffect(() => {
    dispatch(GET_PRICE_RANGE({ productdata }));
  }, [dispatch, productdata]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ productdata, value }));
  }, [value]);


  const clearAllFilter = () => {
    setValue(maxPrices);
    setSort("Latest");
    setCatValue("");
  };

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

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(collection(db, "Category"));

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          categoryArray.push({
            ...data,
            id: doc.id,
          });
          setIsLoading(false);
        });
        setCategoryData(categoryArray);
      } catch (error) {
        setIsLoading(false);
        toast.error(error.message);
      }
    })();
  }, []);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };
  const addToWishlist = (product) => {
    dispatch(ADD_TO_WISHLIST(product));
  };

  const searchProducts = () => {
    dispatch(FILTER_BY_SEARCH({ search, productdata }));
  };


  const suggestion = () => {
    dispatch(FILTER_SUGGEST({ search, productdata }));
  };

  const suggestSearch = (itemName) => {
    dispatch(SUGGEST_SEARCH({ itemName, productdata }));
    setShowSuggestions(false)
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      suggestion();
      console.log("suggest");
    }, 300);
    return () => clearTimeout(timer);
  }, [search]);

 useEffect(()=>{
  console.log('red')
  let handler = (e)=>{
    if(!suggestionRef.current?.contains(e.target)){
      setShowSuggestions(false)
    }
  }
  document.addEventListener('mousedown', handler)

  return ()=> document.removeEventListener('mousedown', handler)
 },[showSuggestions])

 console.log(filterProducts[1]+'mapp')

  return (
    <>
      {isLoading && <Loader />}
      <Grid
        container
        sx={{
          width: "100%",
          display: "flex",
          p: 2,
          gap: 1,
          justifyContent: "space-around",
          alignItems: "center",
          bgcolor: colors.lightpink,
        }}
        // component="paper"
        elevation={4}
      >
        <Grid sx={{ display: "flex" }}>
          <ViewCozyIcon sx={{ color: "brown" }} />
          <Typography>{filterProducts.length} products found</Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            flexDirection: "column",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid sx={{ display: "flex" }}>
            <TextField
              size="small"
              placeholder="search..."
              value={search ? search : ""}
         
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              onFocus={() => setShowSuggestions(true)}
              // onBlur={() => setShowSuggestions(false)}
            />
            <Button
              sx={{ bgcolor: colors.blueGrey600 }}
              onClick={() => searchProducts()}
            >
              🔎
            </Button>
          </Grid>
          {showSuggestions && (
            <Grid
              ref={suggestionRef}
              sx={{
                position: "absolute ",
                width: { xl: "19%", xs: "80%" },
                mt: 5,
                bgcolor: "white",
                borderRadius: 2,
                zIndex: 1,
              }}
            >
              {suggestionBox.length === 0 ? (
                ""
              ) : (
                <List
               
                >
                  {suggestionBox.map((item) => {
                    // console.log(item,'suggestion')
                    return (
                      <ListItem
                        key={item.id}
                        sx={{
                          "&:hover": { bgcolor: colors.grey300 },
                          cursor: "pointer",
                        }}
                        onClick={() => suggestSearch(item.name)}
                      >
                        {item.name}
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </Grid>
          )}
          {/* <Button sx={{ bgcolor: colors.darkred }} onClick={clearSearchFilter}>
            <HighlightOffIcon sx={{ color: "white" }} />
          </Button> */}
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography>
            {" "}
            <Typography>Filter by category:</Typography>
          </Typography>
          <Box sx={{ minWidth: 120,zIndex: 0, }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={catValue}
                label="Language"
                onChange={(e) => setCatValue(e.target.value)}
              >
                <MenuItem value={"All Categories"}>All Categories</MenuItem>
                {categoryData.map((cat) => (
                  <MenuItem value={cat.categoryName} key={cat.id}>
                    {cat.categoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={2}
          lg={1}
          xl={1}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            textAlign: "center",
          }}
        >
          <Typography>Filter by price : &#8377;.{`${value}`}.00</Typography>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
            p: 3,
          }}
        >
          <Box sx={{ width: 140, display: "flex", justifyContent: "end" }}>
            <Slider
              defaultValue={maxPrices}
              min={0}
              max={maxPrices}
              getAriaLabel={() => "Temperature range"}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              valueLabelDisplay=""
              getAriaValueText={valuetext}
            />
          </Box>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography>
            {" "}
            <Typography>Sort by:</Typography>
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Sort by
              </InputLabel>
              <NativeSelect
                defaultValue={"Latest"}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value={"Latest"}>Latest</option>
                <option value={"Lowest Price"}>Lowest Price</option>
                <option value={"Highest Price"}>Highest Price</option>
                <option value={"A - Z"}>A - Z</option>
                <option value={"Z - A"}>Z - A</option>
              </NativeSelect>
            </FormControl>
          </Box>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            onClick={clearAllFilter}
            sx={{ textTransform: "none" }}
          >
            Clear all filter
          </Button>
        </Grid>
      </Grid>
      <motion.div>
        <Grid
          container
          spacing={3}
          sx={{ display: "flex", justifyContent: "center", p: 2 }}
        >
          {filterProducts.length === 0 ? (
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
                <p>No products found</p>
              </Grid>
            </>
          ) : (
            filterProducts.map((product) => {
              
              return (
                <Grid key={product?.id} item xs={12} sm={6} md={4} lg={4} xl={3}>
                  <Card
                    sx={{
                      maxWidth: 280,
                      margin: "0 auto",
                      padding: "0.1em",
                      bgcolor: colors.grey100,
                      "&:hover": { boxShadow: 5 },
                    }}
                  >
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
                      <Avatar
                        sx={{ cursor: "pointer" }}
                        onClick={() => {
                          addToWishlist(product);
                        }}
                      >
                        <FavoriteBorderIcon
                          sx={{ color: colors.blueGrey600 }}
                        />
                      </Avatar>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })
          )}
        </Grid>
      </motion.div>
    </>
  );
};

export default ShopProducts;
