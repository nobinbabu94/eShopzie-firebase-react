import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Container, IconButton, Tooltip } from "@mui/material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import ProgressImage from "./ProgressImage";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xl: "40vw", md: "50vw", lg: "60vw", sm: "70vw", xs: "80vw" },
  height: "70vh",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 2,
};

export default function AddProduct({ id }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categoriesList, setCategoriesList] = useState();

  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getCategory = () => {
    try {
      const productRef = collection(db, "Category");
      const q = query(productRef, orderBy("categoryName"));

      onSnapshot(q, (snapshot) => {
        const allCategory = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategoriesList(allCategory);
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);

  const onSubmit = async (data) => {
    try {
      const file = data.productImage[0];
      var storagePath = `/eShopzie/${Date.now()}${file.name}`;
      const storageRef = ref(storage, storagePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // progrss function ....
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          setUploadProgress(progress);
        },
        (error) => {
          toast.error("error", error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              addDoc(collection(db, "Products"), {
                name: data.productname,
                category: data.category,
                brand: data.brand,
                price: Number(data.price),
                description: data.description,
                downloadURL,
                timestamp: Timestamp.now().toDate(),
              });
              toast.success("Product added successfully");
              handleClose();
            })
            .then(() => {
              reset();
            });
        }
      );
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
        <Button onClick={handleOpen}>
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
          {/* <EditProduct /> */}
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
                  //   bgcolor: "green",

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
                  <h2>Add Product</h2>
                  <TextField
                    defaultValue={id}
                    sx={textFieldStyle}
                    type="text"
                    size="medium"
                    placeholder="Product Name"
                    fullWidth
                    {...register("productname", { required: true })}
                  />

                  {errors.productname &&
                    errors.productname.type === "required" && (
                      <p
                        style={{
                          padding: 0,
                          margin: 0,
                          fontSize: ".8em",
                          color: "red",
                        }}
                      >
                        Product Name is required.
                      </p>
                    )}
                  <TextField
                    justify="center"
                    alignItems="center"
                    direction="row"
                    sx={textFieldStyle}
                    select
                    size="medium"
                    fullWidth
                    defaultValue={""}
                    label="Select category"
                    inputProps={register("category", {
                      required: "Please enter currency",
                    })}
                  >
                    {/* <MenuItem value="none">
                      <em>None</em>
                    </MenuItem> */}
                    {categoriesList?.map((dist) => (
                      <MenuItem value={dist?.categoryName} key={dist?.id}>
                        {dist?.categoryName}
                      </MenuItem>
                    ))}
                  </TextField>

                  {errors.categoryname &&
                    errors.categoryname.type === "required" && (
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
                  <TextField
                    size="medium"
                    sx={textFieldStyle}
                    multiline
                    type="text"
                    placeholder="Brand Name"
                    fullWidth
                    {...register("brand", { required: true })}
                  />

                  {errors.brand && errors.brand.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontSize: ".8em",
                        color: "red",
                      }}
                    >
                      Brand Name is required.
                    </p>
                  )}
                  <TextField
                    size="medium"
                    sx={textFieldStyle}
                    type="tel"
                    placeholder="Price of Product"
                    fullWidth
                    {...register("price", {
                      required: true,
                      pattern: /^(0|[1-9]\d*)(\.\d+)?$/,
                    })}
                  />

                  {errors.price && errors.price.type === "required" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontSize: ".8em",
                        color: "red",
                      }}
                    >
                      Price is required.
                    </p>
                  )}
                  {errors.price && errors.price.type === "pattern" && (
                    <p
                      style={{
                        padding: 0,
                        margin: 0,
                        fontSize: ".8em",
                        color: "red",
                      }}
                    >
                      Number only allowed
                    </p>
                  )}
                  <TextField
                    size="medium"
                    sx={textFieldStyle}
                    multiline
                    type="text"
                    placeholder="Product description"
                    fullWidth
                    {...register("description", { required: true })}
                  />

                  {errors.description &&
                    errors.description.type === "required" && (
                      <p
                        style={{
                          padding: 0,
                          margin: 0,
                          fontSize: ".8em",
                          color: "red",
                        }}
                      >
                        Product description is required.
                      </p>
                    )}
                  <TextField
                    size="medium"
                    sx={textFieldStyle}
                    type="file"
                    placeholder="Image of Product"
                    fullWidth
                    {...register("productImage", { required: true })}
                  />
                  <ProgressImage uploadProgress={uploadProgress} />
                  {errors.productImage &&
                    errors.productImage.type === "required" && (
                      <p
                        style={{
                          padding: 0,
                          margin: 0,
                          fontSize: ".8em",
                          color: "red",
                        }}
                      >
                        Image is required.
                      </p>
                    )}
                  <Button
                    variant="contained"
                    sx={{
                      width: {
                        xl: "60%",
                        lg: "65%",
                        md: "75%",
                        sm: "100%",
                        xs: "100%",
                      },
                      mt: 1,
                      textTransform: "none",
                    }}
                    fullWidth
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Container>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
