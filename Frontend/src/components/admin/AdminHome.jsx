import { Avatar, Divider, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import InfoBox from "./InfoBox";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";
import { toast } from "react-toastify";
import Chart from "./Chart";
import { useNavigate } from "react-router-dom";

const avtarRupee = <Avatar sx={{ color: "brown" }}>&#8377;</Avatar>;
const avtarProducts = (
  <Avatar sx={{ color: "blue" }}>
    <ShoppingCartIcon />
  </Avatar>
);
const avtarOrders = (
  <Avatar sx={{ color: "green" }}>
    <ProductionQuantityLimitsIcon />
  </Avatar>
);

const AdminHome = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  
  const array = [];
  orders.map((item) => {
    const { orderAmount } = item;
    const quantity = orderAmount;

    return array.push(quantity);
  });

  //array reduce method have 2 parameters and will return all the values to be calculated, initial value 0

  const totalOrderAmount = array.reduce((a, b) => {
    return a + b;
  }, 0);

  useEffect(() => {
    getProducts();
    getAllOrders();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productRef = collection(db, "Products");

      onSnapshot(productRef, (snapshot) => {
        const allProduct = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(allProduct);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const getAllOrders = () => {
    setIsLoading(true);
    try {
      const orderRef = collection(db, "Orders");

      onSnapshot(orderRef, (snapshot) => {
        const orderList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setOrders(orderList);
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };
  return (
    <>
      <Grid
        container
        sx={{
          gap: 2,
          mb: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Grid
          container
          sx={{
            width: "100%",
            gap: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ display: "flex" }}
          >
            <InfoBox
              title={"Earnings"}
              count={`Rs.${totalOrderAmount}/-`}
              icon={avtarRupee}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ display: "flex" }}
          >
            <InfoBox
              title={"Products"}
              count={products?.length}
              icon={avtarProducts}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={4}
            xl={4}
            sx={{ display: "flex" }}
          >
            <InfoBox
              title={"Orders"}
              count={orders.length}
              icon={avtarOrders}
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid
          container
          sx={{
            width: "50%",
            gap: 2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Chart />
        </Grid>
      </Grid>
    </>
  );
};

export default AdminHome;
