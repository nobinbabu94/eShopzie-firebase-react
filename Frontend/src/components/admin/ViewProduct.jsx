import { Button, Grid, TextField, Typography } from "@mui/material";
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
import { db } from "../../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import ProductDelete from "./ProductDelete";
import ProductEditModal from "./ProductEditModal";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../redux/slice/ProductSlice";
import Loader from "../Loader";
import CloseIcon from "@mui/icons-material/Close";
import AddProduct from "./AddProduct";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
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

const ViewProduct = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const dispatch = useDispatch();

  const clearTextField = () => setSearch("");

  useEffect(() => {
    dispatch(
      STORE_PRODUCTS({
        products: products,
      })
    );
  }, [dispatch, products]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productRef = collection(db, "Products");
      const q = query(productRef, orderBy("timestamp"));

      onSnapshot(q, (snapshot) => {
        const allProduct = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(allProduct.reverse());
        setIsLoading(false);
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Grid container direction="row" justifyContent="center">
        <h2>All Products</h2>
      </Grid>
      {products.length === 0 ? (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
        >
          <p>No products found.</p>
          <Grid
            direction="column"
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            Add Product
            <AddProduct />
          </Grid>
        </Grid>
      ) : (
        <Grid container direction="column" sx={{ gap: 2, p: 2 }}>
          <Grid item sx={{}}>
            <Typography>Search Product Name</Typography>
            <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
              <Grid sx={{ display: "flex" }}>
                <TextField
                  type="text"
                  size="small"
                  placeholder="search..."
                  value={search ? search : ""}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                <Button
                  onClick={clearTextField}
                  variant="contained"
                  sx={{ boxShadow: "0" }}
                >
                  <CloseIcon />
                </Button>
              </Grid>
              <Grid sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <AddProduct />
                Add Product
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%", height: "auto", overflow: "scroll" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">sl no</StyledTableCell>
                    <StyledTableCell align="center">Image</StyledTableCell>
                    <StyledTableCell align="center">
                      Name of Product
                    </StyledTableCell>
                    <StyledTableCell align="center">
                      Category Name
                    </StyledTableCell>
                    <StyledTableCell align="center"> Price </StyledTableCell>
                    <StyledTableCell align="center">
                      Description
                    </StyledTableCell>

                    <StyledTableCell align="center"> Actions </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products
                    .filter((item) => {
                      if (search == "") {
                        return item;
                      } else if (
                        item.name.toLowerCase().includes(search.toLowerCase())
                      ) {
                        return item;
                      }
                    })
                    .map((item, index) => {
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
                            {/* <Avatar
                              sx={{ border: 1, width: 70, height: 70 }}
                              alt="no image" */}
                            <img width={120} src={item.downloadURL} alt="#" />
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {item.name}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {item.category}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            Rs.{item.price}/-
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            sx={{
                              whiteSpace: "nowrap",
                              maxWidth: "200px",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {item.description}
                          </StyledTableCell>
                          <StyledTableCell
                            align="center"
                            justifyContent="center"
                          >
                            <Grid sx={{ display: "flex" }}>
                              <ProductEditModal
                                id={item.id}
                                name={item.name}
                                category={item.category}
                                price={item.price}
                                description={item.description}
                                brandname={item.brand}
                                urlImg={item.downloadURL}
                              />
                              <ProductDelete
                                id={item.id}
                                url={item.downloadURL}
                                name={item.name}
                              />
                            </Grid>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
};

export default ViewProduct;
