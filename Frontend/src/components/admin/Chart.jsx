import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

const Chart = () => {
  const [orders, setOrders] = useState([]);

  const array = [];

  useEffect(() => {
    (async () => {
      const querySnapshot = await getDocs(collection(db, "Orders"));
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        array.push({
          ...data,
        });
      });
      setOrders(array);
    })();
  }, []);

  const orderArray = [];

  orders.map((item) => {
    const { orderStatus } = item;
    return orderArray.push(orderStatus);
  });

  const getOrderCount = (orderArray, value) => {
    return orderArray.filter((n) => n === value).length;
  };

  const [q1, q2, q3, q4] = [
    "order placed",
    "processing",
    "Shipped",
    "Delivered",
  ];

  const placed = getOrderCount(orderArray, q1);
  const processing = getOrderCount(orderArray, q2);
  const shipped = getOrderCount(orderArray, q3);
  const delivered = getOrderCount(orderArray, q4);

  const data = {
    labels: ["Placed Orders", " Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Order count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  return (
    <>
      <Grid
        sx={{
          width: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          sx={{
            width: "100vw",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Typography variant="h5"> Order status chart</Typography>
        </Grid>
        <Grid
          sx={{
            width: "40vw",
            mt: 3,
          }}
        >
          <Bar options={options} data={data} />
        </Grid>
      </Grid>
    </>
  );
};

export default Chart;
