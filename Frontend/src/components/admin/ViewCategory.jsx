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
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { STORE_PRODUCTS } from "../../redux/slice/ProductSlice";
import Loader from "../Loader";

import AddCategory from "./AddCategory";
import DeleteCategory from "./DeleteCategory";
import EditCategory from "./EditCategory";

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

const ViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState([]);
  const dispatch = useDispatch();

  const clearTextField = () => setSearch("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productRef = collection(db, "Category");
      const q = query(productRef, orderBy("categoryName"));

      onSnapshot(q, (snapshot) => {
        const allCategories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setCategories(allCategories);
        setIsLoading(false);
        dispatch(
          STORE_PRODUCTS({
            product: allCategories,
          })
        );
      });
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Catogery</Typography>
      </Grid>

      {categories.length === 0 ? (
        <>
          <Grid container direction="row" justifyContent="center">
            <p>No products found.</p>
          </Grid>
          <Grid
            direction="column"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              mt: 2,
            }}
          >
            Add Category
            <AddCategory />
          </Grid>
        </>
      ) : (
        <Grid container direction="column" sx={{ gap: 2, p: 2 }}>
          <Grid item sx={{}}>
            <Typography>Search Category Name</Typography>
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
                <AddCategory />
                {/* <ProductEditModal /> */}
                Add Category
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ width: "100%", height: "auto", overflow: "scroll" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">sl no</StyledTableCell>
                    <StyledTableCell align="center">Category </StyledTableCell>

                    <StyledTableCell align="center"> Actions </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories
                    .filter((item) => {
                      if (search == "") {
                        return item;
                      } else if (
                        item.categoryName
                          .toLowerCase()
                          .includes(search.toLowerCase())
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
                          <StyledTableCell
                            component="th"
                            scope="row"
                            align="center"
                          >
                            {index + 1}
                          </StyledTableCell>

                          <StyledTableCell align="center">
                            {item.categoryName}
                          </StyledTableCell>

                          <StyledTableCell>
                            <Grid
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <EditCategory
                                id={item.id}
                                category={item.categoryName}
                              />
                              <DeleteCategory
                                id={item.id}
                                category={item.categoryName}
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

export default ViewCategory;
