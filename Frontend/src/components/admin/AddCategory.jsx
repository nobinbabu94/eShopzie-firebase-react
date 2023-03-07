import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Container, IconButton, Tooltip } from "@mui/material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xl: "40vw", md: "50vw", lg: "60vw", sm: "70vw", xs: "80vw" },
  height: "60vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 2,
};

export default function AddCategory({ id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, "Category"), {
        categoryName: data.categoryName,
        created: Timestamp.now().toDate(),
      });

      toast.success("Category Added Successfully");
      handleClose();
    } catch (error) {
      toast.error("error", error);
    }
  };

  const parentStyle = {
    width: "100%",
    height: "auto",
    p: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  const textFieldStyle = {
    width: { xl: "60%", lg: "65%", md: "75%", sm: "100%", xs: "100%" },
  };

  return (
    <div>
      <Tooltip title="Add Product">
        <Button onClick={handleOpen} variant="contained">
          <AddCircleOutlineIcon />
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
              }}
            >
              <Box>
                <IconButton
                  style={{ position: "absolute", top: "0", right: "0" }}
                  onClick={handleClose}
                >
                  <CloseIcon />
                </IconButton>
              </Box>
              <Grid
                item
                sx={{
                  width: {
                    xl: "40vw",
                    lg: "60vw",
                    md: "60vw",
                    sm: "90vw",
                    xs: "90vw",
                  },
                  boxShadow: 1,
                  borderRadius: 5,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Grid
                  item
                  component={"form"}
                  onSubmit={handleSubmit(onSubmit)}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 1,
                    mb: 5,
                    p: 2,
                    textAlign: "center",
                    width: {
                      xl: "30vw",
                      lg: "40vw",
                      md: "50vw",
                      sm: "70vw",
                      xs: "70vw",
                    },
                  }}
                >
                  <h2>Add Category</h2>
                  <TextField
                    defaultValue={id}
                    sx={textFieldStyle}
                    type="text"
                    size="medium"
                    placeholder="Category Name"
                    fullWidth
                    {...register("categoryName", { required: true })}
                  />

                  {errors.categoryName &&
                    errors.categoryName.type === "required" && (
                      <p
                        style={{
                          padding: 0,
                          margin: 0,
                          fontSize: ".8em",
                          color: "red",
                        }}
                      >
                        Category Name is required.
                      </p>
                    )}
                  <Grid
                    sx={{
                      width: {
                        xl: "60%",
                        lg: "65%",
                        md: "75%",
                        sm: "100%",
                        xs: "100%",
                      },
                      mt: 1,
                      display: "flex",
                      justifyContent: "end",
                      gap: 2,
                    }}
                  >
                    <Button
                      variant="contained"
                      sx={{ bgcolor: "grey", "&:hover": { bgcolor: "grey" } }}
                      onClick={handleClose}
                    >
                      cancel
                    </Button>
                    <Button variant="contained" type="submit">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
