import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Container,
  Divider,
  IconButton,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import { Button, Grid, MenuItem } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../../Styles/theme";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase/config";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xl: "70vw", md: "65vw", lg: "60vw", sm: "70vw", xs: "80vw" },
  height: "70vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 2,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    // backgroundColor: theme.palette.common.black,
    color: "blue",
    fontSize: "1.1em",
    borderColor: "black",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: colors.grey100,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrderDetails({
  orderProduct,
  orderId,
  orderAmount,
  orderFull,
}) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const editOrder = (e, orderId) => {
    e.preventDefault();
    setLoading(true);
    const orderConfig = {
      userId: orderFull.userId,
      userEmail: orderFull.userEmail,
      orderDate: orderFull.orderDate,
      oederTime: orderFull.oederTime,
      orderAmount: orderFull.orderAmount,
      orderStatus: status,
      cartItems: orderFull.cartItems,
      shippingAddress: orderFull.shippingAddress,
      createdAt: orderFull.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "Orders", orderId), orderConfig);
      setLoading(false);
      toast.success("Order status changed successfully");
      handleClose();
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

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
      <Tooltip title="View order">
        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{ textTransform: "none" }}
        >
          Change order status
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <IconButton
            style={{ position: "absolute", top: "0", right: "0" }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

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
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Typography variant="h5">Order details</Typography>
              <Grid
                container
                sx={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  borderRadius: 5,
                }}
              >
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={4}
                  lg={4}
                  xl={4}
                  sx={{
                    width: "50%",
                    display: "block",
                    flexDirection: "column",
                    mt: 3,

                    p: 2,
                    borderRadius: 5,
                  }}
                >
                  <Typography>Order Id : {orderId} </Typography>
                  <Typography>
                    Order Amount : &#8377;.{orderAmount}/-{" "}
                  </Typography>
                  <Typography>
                    Order Status : {orderFull.orderStatus}{" "}
                  </Typography>
                  <Typography>
                    Receipent : {orderFull.shippingAddress.recepient}{" "}
                  </Typography>
                  <Grid sx={{ display: "flex", gap: 1 }}>
                    <Typography>Address:</Typography>

                    <Typography>
                      {orderFull.shippingAddress.address1},
                    </Typography>
                    <Typography>
                      {orderFull.shippingAddress.address2
                        ? orderFull.shippingAddress?.address2
                        : ""}
                      {orderFull.shippingAddress.address2 ? "," : ""}
                    </Typography>
                  </Grid>
                  <Grid sx={{ display: "flex", gap: 1 }}>
                    <Typography>{orderFull.shippingAddress.city},</Typography>
                    <Typography>{orderFull.shippingAddress.state},</Typography>
                    <Typography>
                      {orderFull.shippingAddress.country},
                    </Typography>
                    <Typography>{orderFull.shippingAddress.pin},</Typography>

                    <Typography>{orderFull.shippingAddress.phone}</Typography>
                  </Grid>
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
                    alignItems: "end",
                    mt: 3,
                  }}
                >
                  <Box
                    sx={{
                      minWidth: 150,
                      gap: 2,
                      p: 2,
                      borderRadius: 5,
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <Typography sx={{ mb: 2 }}>Update order status</Typography>
                    <Grid
                      component="form"
                      fullWidth
                      size="small"
                      onSubmit={(e) => editOrder(e, orderId)}
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "60%",
                      }}
                    >
                      <Select
                        id="demo-simple-select"
                        defaultValue={orderFull.orderStatus}
                        value={status}
                        label="Age"
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <MenuItem value={""} disabled>
                          -Select status-
                        </MenuItem>
                        <MenuItem value={"processing"}>processing</MenuItem>
                        <MenuItem value={"order placed"}>order placed</MenuItem>
                        <MenuItem value={"Shipped"}>Shipped</MenuItem>
                        <MenuItem value={"Delivered"}>Delivered</MenuItem>
                      </Select>
                      <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Update Status
                      </Button>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              <Divider />
              <Grid
                item
                sx={{
                  width: "100%",
                  height: "auto",
                  overflow: "scroll",
                  mt: 4,
                }}
              >
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 800 }} aria-label="customized table">
                    <TableHead>
                      <TableRow sx={{ fontSize: "10pt" }}>
                        <StyledTableCell align="center">No.</StyledTableCell>
                        <StyledTableCell align="center">Image</StyledTableCell>
                        <StyledTableCell align="center">
                          Name of Product
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Category Name
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Unit Price
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Total Quantity
                        </StyledTableCell>
                        <StyledTableCell align="center">
                          Total Amount
                        </StyledTableCell>
                       
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderProduct.map((item, index) => {
                        return (
                          <StyledTableRow
                            key={item.id}
                            sx={{ "&:hover": { bgcolor: "#e0e0e0" } }}
                          >
                            <StyledTableCell component="th" scope="row">
                              {index + 1}
                            </StyledTableCell>
                            <StyledTableCell
                              align="center"
                              justifyContent="center"
                            >
                              <img src={item.downloadURL} alt="#" width={80} />
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item.name}
                            </StyledTableCell>

                            <StyledTableCell align="center">
                              {item.category}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              &#8377;.{item.price}/-
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              {item.cartQuantity}
                            </StyledTableCell>
                            <StyledTableCell align="center">
                              &#8377;.{item.price * item.cartQuantity}/-
                            </StyledTableCell>
                       
                          </StyledTableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Container>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
