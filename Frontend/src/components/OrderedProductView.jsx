import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import {
  Container,
  Divider,
  IconButton,
  Paper,
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
import { Button, Grid } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import { colors } from "../Styles/theme";
import styled from "styled-components";

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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function OrderedProductView({ orderHistory }) {
  const [open, setOpen] = useState(false);

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
          View order
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
              <Divider />
              <Grid
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "start",
                  flexDirection: "column",
                }}
              >
                <Grid
                  sx={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "start",
                  }}
                >
                  <Typography> Address :</Typography>{" "}
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                  }}
                >
                  <Typography>
                    {orderHistory.shippingAddress.address1},{" "}
                  </Typography>
                  <Typography>
                    {orderHistory.shippingAddress.address2
                      ? orderHistory.shippingAddress.address2
                      : ""}
                    {orderHistory.shippingAddress.address2 ? "," : ""}{" "}
                  </Typography>

                  <Typography>{orderHistory.shippingAddress.city}, </Typography>

                  <Typography>
                    {orderHistory.shippingAddress.state},{" "}
                  </Typography>
                  <Typography>{orderHistory.shippingAddress.pin}, </Typography>

                  <Typography>
                    {orderHistory.shippingAddress.country},{" "}
                  </Typography>
                  <Typography>
                    {orderHistory.shippingAddress.phone},{" "}
                  </Typography>
                </Grid>
              </Grid>

              <Divider />
              <Grid
                item
                sx={{
                  width: "100%",
                  height: "auto",
                  overflow: "scroll",
                  mt: 3,
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
                        {orderHistory.orderStatus === "Delivered" ? (
                          <StyledTableCell align="center">
                            Actions
                          </StyledTableCell>
                        ) : (
                          ""
                        )}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orderHistory.cartItems.map((item, index) => {
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
                            <StyledTableCell>
                              &#8377;.{item.price * item.cartQuantity}/-
                            </StyledTableCell>
                            {orderHistory.orderStatus === "Delivered" ? (
                              <StyledTableCell align="center" width={150}>
                                <Link
                                  to={`/review/${item.id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  {" "}
                                  <Button
                                    variant="contained"
                                    sx={{ textTransform: "none" }}
                                  >
                                    Review Product
                                  </Button>
                                </Link>
                              </StyledTableCell>
                            ) : (
                              ""
                            )}
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
