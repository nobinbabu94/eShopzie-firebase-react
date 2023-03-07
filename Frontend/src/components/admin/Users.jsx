import { Grid, Typography } from "@mui/material";
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
import { collection, onSnapshot } from "firebase/firestore";

import Loader from "../Loader";

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

const Users = () => {
  const [userlist, setUserlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
 

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setIsLoading(true);
    try {
      const productRef = collection(db, "Users");

      onSnapshot(productRef, (snapshot) => {
        const allCategories = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setUserlist(allCategories);
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
      <Grid sx={{ display: "flex", justifyContent: "center" }}>
        <Typography variant="h5">Users</Typography>
      </Grid>

      {userlist.length === 0 ? (
        <>
          <Grid container direction="row" justifyContent="center">
            <p>No products found.</p>
          </Grid>
        </>
      ) : (
        <Grid container direction="column" sx={{ gap: 2, p: 2 }}>
          <Grid item sx={{ width: "100%", height: "auto", overflow: "scroll" }}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell align="center">sl no</StyledTableCell>
                    <StyledTableCell align="center">
                      User Name{" "}
                    </StyledTableCell>

                    <StyledTableCell align="center">
                    User Email{" "}
                    </StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {userlist.map((item, index) => {
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
                          {item.name}
                        </StyledTableCell>

                        <StyledTableCell align="center">
                        {item.email}
                          {/* {item?.created.toDate().toLocaleDateString("en-US")} -
                          {item?.created.toDate().toLocaleTimeString("en-US")} */}
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

export default Users;
