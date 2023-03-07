import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { Container, IconButton, Tooltip } from "@mui/material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import React, { useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { toast } from "react-toastify";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../firebase/config";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
} from "firebase/firestore";
import ProgressImage from "./ProgressImage";
import { colors } from "../../Styles/theme";

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

export default function ProductEditModal({
  id,
  name,
  price,
  description,
  category,
  brandname,
  urlImg,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categoriesList, setCategoriesList] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const url = downloadURL ? downloadURL : urlImg;
            setDoc(doc(db, "Products", id), {
              name: data.productname,
              category: data.category,
              brand: data.brand,
              price: Number(data.price),
              description: data.description,
              downloadURL: downloadURL ? downloadURL : url,
              timestamp: Timestamp.now().toDate(),
            });
            toast.success("Product edited successfully");
            handleClose();
          });
        }
      );
    } catch (error) {
      toast.error(error.message);
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
          {" "}
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
                  <h2>Edit Product</h2>
                  <TextField
                    defaultValue={name}
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
                    sx={textFieldStyle}
                    select
                    defaultValue={category}
                    size="medium"
                    fullWidth
                    label="Select category"
                    inputProps={register("category", {
                      required: "Please enter currency",
                    })}
                  >
                    {categoriesList?.map((cate) => (
                      <MenuItem value={cate.categoryName} key={cate.id}>
                        {cate.categoryName}
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
                    defaultValue={brandname}
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
                    defaultValue={price}
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
                    defaultValue={description}
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

                  <img src={urlImg} width={100} alt="#" />
                  <TextField
                    size="medium"
                    sx={textFieldStyle}
                    type="file"
                    placeholder="Image of Product"
                    fullWidth
                    {...register("productImage")}
                  />
                  {uploadProgress ? (
                    <ProgressImage uploadProgress={uploadProgress} />
                  ) : (
                    ""
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
