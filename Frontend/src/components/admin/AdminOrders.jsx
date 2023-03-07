import { Grid,  } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { toast } from "react-toastify";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { STORE_ORDERS } from "../../redux/slice/OrderSlice";
import Loader from "../Loader";
import { colors } from "../../Styles/theme";
import { db } from "../../firebase/config";
import OrderDetails from "./OrderDetails";

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

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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

  // const orders = orders.filter((order) => order.userId === userId);

  return (
    <>
      <Grid container direction="column" sx={{ gap: 2, p: 2, width: "100%" }}>
        {isLoading && <Loader />}
        <Grid container direction="row" justifyContent="center">
          <h2>Order History</h2>
        </Grid>
        {orders.length === 0 ? (
          <Grid container direction="row" justifyContent="center">
            <p>Not found any orders</p>
          </Grid>
        ) : (
          <Grid item sx={{ width: "100%", height: "auto" }}>
            <TableContainer component={Paper} sx={{ height: 500 }}>
              <Table sx={{ minWidth: 600 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">sl no</StyledTableCell>
                    <StyledTableCell align="center">Date</StyledTableCell>
                    <StyledTableCell align="center">Order ID</StyledTableCell>
                    <StyledTableCell align="center">
                      Order Amount
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      {" "}
                      Order Status{" "}
                    </StyledTableCell>
                    <StyledTableCell align="center">Actions</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((item, index) => {
                    return (
                      <StyledTableRow
                        key={item.id}
                        sx={{ "&:hover": { bgcolor: "#e0e0e0" } }}
                      >
                        <StyledTableCell component="th" scope="row">
                          {index + 1}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {item.orderDate}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                          {item.id}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          &#8377;.{item.orderAmount}/-
                        </StyledTableCell>

                        <StyledTableCell
                          align="center"
                          sx={{
                            color:
                              item.orderStatus === "Delivered"
                                ? colors.green
                                : colors.darkred,
                          }}
                        >
                          {item.orderStatus}
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          <OrderDetails
                            orderProduct={item.cartItems}
                            orderId={item.id}
                            orderAmount={item.orderAmount}
                            orderFull={item}
                          />
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default AdminOrders;
