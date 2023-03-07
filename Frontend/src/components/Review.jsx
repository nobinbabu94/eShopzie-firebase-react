import { Button, Grid, TextField, Typography } from "@mui/material";
import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { selectUserId, selectUserName } from "../redux/slice/AuthSlice";
import StarsRating from "react-star-rate";
import { toast } from "react-toastify";

const Review = () => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");
  const [ setGetReview] = useState("");
  const [productList, setProductList] = useState([]);

  const { id } = useParams();
  const userId = useSelector(selectUserId);
  let userName = useSelector(selectUserName);
  const product = productList.find((item) => item.id === id);
  const array = [];
  const reviewArray = [];

  const navigate = useNavigate();

  useEffect(() => {
    const userToken = localStorage.getItem("usertoken");
    if (!userToken) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "Products"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        array.push({
          ...data,
          id: doc.id,
        });
      });
      setProductList(array);
    })();
  }, []);
  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "Reviews"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        reviewArray.push({
          ...data,
          id: doc.id,
        });
      });
      setGetReview(reviewArray);
    })();
  }, []);

  const submitReview = (e) => {
    e.preventDefault();
    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userId,
      userName: userName,
      productId: product.id,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      addDoc(collection(db, "Reviews"), reviewConfig);
      navigate("/shop");
      toast.success("Review submitted successfully");
      setRate(0);
      setReview("");
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <Grid
        container
        sx={{
          width: "100%",
          p: 2,
          display: "flex",
          flexDirection: "column",
          gap: 3,
        }}
      >
        <Grid
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Review Product</Typography>
        </Grid>
        <Grid
          container
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            p: 2,
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Grid sx={{ width: "100%", display: "flex" }}>
              <Grid
                sx={{
                  width: "40%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  p: 2,
                }}
              >
                <Typography variant="h6"> Product</Typography>
                <Typography variant="h6"> Category </Typography>

                <Typography variant="h6"> Price</Typography>
              </Grid>
              <Grid
                sx={{
                  width: "60%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  p: 2,
                }}
              >
                <Typography variant="h6"> : {product?.name}</Typography>
                <Typography variant="h6"> : {product?.category}</Typography>

                <Typography variant="h6">
                  {" "}
                  : &#8377;.{product?.price}/-
                </Typography>
              </Grid>
            </Grid>
            <Grid
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <img width={200} src={product?.downloadURL} alt="#" />
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{
              width: "50%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            component={"form"}
            onSubmit={(e) => submitReview(e)}
          >
            <Typography>Rating</Typography>
            <Grid>
              <div>
                <StarsRating
                  value={rate}
                  onChange={(rate) => {
                    setRate(rate);
                  }}
                />
              </div>
            </Grid>
            <Grid
              sx={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <TextField
                required
                placeholder="Your Review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                variant="outlined"
                sx={{ m: 1 }}
                multiline
                minRows={6}
                maxRows={20}
                size="large"
                style={{ width: "60%" }}
              />
              <Button type="submit" variant="contained">
                Submit review
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
