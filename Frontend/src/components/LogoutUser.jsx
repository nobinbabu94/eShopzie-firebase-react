import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import WarningRoundedIcon from "@mui/icons-material/WarningRounded";
import { Divider, Grid, ListItemIcon } from "@mui/material";
import { colors } from "../Styles/theme";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '90%',
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function LogoutUser() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    toast.success("Logout successfully");
    await signOut(auth)
      .then(() => {
        handleClose();
        localStorage.removeItem("usertoken");
        navigate("/login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Failed to logout");
      });
  };
  return (
    <>
      {isLoading && <Loader />}
      <Button onClick={handleOpen} style={{ textTransform: "none" }}>
        <ListItemIcon>
          <Logout fontSize="small" sx={{ color: "white" }} />
        </ListItemIcon>
        <Typography sx={{ color: "white" }} fullWidth>
          Logout
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="alert-dialog-modal-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
            sx={{ display: "flex", gap: 1 }}
          >
            <WarningRoundedIcon />
            Confirmation
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography
            id="alert-dialog-modal-description"
            textColor="text.tertiary"
            mb={3}
          >
            Are you sure you want to logout?
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Grid
            fullwidth
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "end",
              gap: 1,
            }}
          >
            <Button
              variant="contained"
              style={{ textTransform: "none" }}
              sx={{
                bgcolor: "white",
                color: "black",
                "&:hover": { bgcolor: "white" },
              }}
              onClick={handleClose}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              style={{ textTransform: "none" }}
              sx={{
                bgcolor: colors.darkred,
                "&:hover": { bgcolor: colors.lightred },
              }}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
