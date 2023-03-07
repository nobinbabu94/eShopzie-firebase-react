import { Grid, IconButton, Typography } from "@mui/material";
import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect } from "react";
import { useState } from "react";

const ListofProducts = () => {
  const productArray = [];
  const [productdata, setProductdata] = useState([]);


  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        productArray.push({
          ...data,
        });
      });
      setProductdata(productArray);
    })();
  }, []);

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          gap: 3,
          mt: 2,
          mb: 2,
          pl: 3,
          pr: 3,
          pb: 4,
        }}
      >
        {productdata.map((product) => {
          return (
            <>
              <Card
                key={product.productName}
                sx={{
                  width: 320,
                  "&:hover": { transform: "scale3d(1.05, 1.05, 1.05)" },
                }}
              >
                <CardMedia
                  component="img"
                  height={250}
                  sc={{ objectFit: "cover" }}
                  image={product.downloadURL}
                  alt="Paella dish"
                />

                <CardContent>
                  <Typography variant="body2" color="black">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rs.{product.price}/-
                  </Typography>
                </CardContent>
                <CardActions
                  disableSpacing
                  sx={{
                    display: "flex",
                    justifyContent: "space-evnely",
                    width: "100%",
                  }}
                >
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <AddShoppingCartIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <RemoveRedEyeIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </>
          );
        })}
      </Grid>
    </>
  );
};

export default ListofProducts;
