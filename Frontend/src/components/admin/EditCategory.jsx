import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Container, Tooltip } from "@mui/material";
import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { db } from "../../firebase/config";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { colors } from "../../Styles/theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xl: "40vw", md: "50vw", lg: "60vw", sm: "70vw", xs: "80vw" },
  height: "50vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 2,
};

export default function EditCategory({ id, category }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await setDoc(doc(db, "Category", id), {
        categoryName: data.categories,
        updated: Timestamp.now().toDate(),
      });
      toast.success("Product added successfully");
      handleClose();
    } catch (error) {
      toast.error("error", error.message);
    }
  };

  const parentStyle = {
    width: "100%",
    height: "320px",
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
      <Tooltip title="Edit">
        <Button onClick={handleOpen} sx={{ color: "green" }}>
          <DriveFileRenameOutlineIcon />
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
                alignItems: "start",
                justifyContent: "center",
                mb: 1,
              }}
            >
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
                  <h2>Edit Category</h2>
                  <TextField
                    defaultValue={category}
                    sx={textFieldStyle}
                    type="text"
                    size="medium"
                    placeholder="Category Name"
                    fullWidth
                    {...register("categories", { required: true })}
                  />

                  {errors.categories &&
                    errors.categories.type === "required" && (
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
                      justifyContent: "space-around",
                      textTransform: "none",
                    }}
                  >
                    <Button
                      variant="contained"
                      onClick={handleClose}
                      sx={{
                        bgcolor: colors.lightGrey,
                        "&:hover": { bgcolor: colors.lightGrey },
                      }}
                    >
                      Cancel
                    </Button>
                    <Button variant="contained" type="submit">
                      Update
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
