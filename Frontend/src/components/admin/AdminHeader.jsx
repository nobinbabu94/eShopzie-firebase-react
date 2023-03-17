import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_ACTIVE_USER,
  selectUserName,
  SET_ACTIVE_USER,
} from "../../redux/slice/AuthSlice";

import { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/config";
import LogoutUser from "../LogoutUser";
import { toast } from "react-toastify";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    height: "100vh",
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminHeader() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [expandmenu, setExpandmenu] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const dispatch = useDispatch();

  
  // const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const handleLogout = async () => {
    toast.success("Logout successfully");
    // setIsLoading(true);
    await signOut(auth)
      .then(() => {
        // setIsLoading(false);
        localStorage.removeItem("admintokenId@#");
        handleClose();
        navigate("/admin-login");
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Failed to logout");
      });
  };

  //currently signed user here
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setDisplayName(user.displayName);

        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName || user.email,
            userId: user.uid,
          })
        );
      } else {
        setDisplayName("");
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const userName = useSelector(selectUserName);

  const handleClick = () => {
    setExpandmenu(!expandmenu);
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Grid sx={{ width: "80%", disply: "flex" }}>
            <Typography sx={{}}>
              eShopzie Admin Dashboard panel &copy;
            </Typography>
          </Grid>
          <Grid
            sx={{ width: "20%", disply: "flex", justifyContent: "center" }}
          ></Grid>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#263238",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{ width: "100%" }}>
          <Grid sx={{ width: "90%", display: "flex", mt: 4, ml: 1 }}>
            <Typography sx={{ color: "white" }}>{userName}</Typography>
          </Grid>

          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{ mt: 5 }}>
          <Link to="home" style={{ textDecoration: "none", color: "white" }}>
            <ListItem sx={{ mt: 2, boxShadow: 2 }}>Home</ListItem>
          </Link>

          <ListItem
            onClick={handleClick}
            sx={{
              mt: 2,
              color: "white",
              cursor: "pointer",
              boxShadow: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Products
            {expandmenu ? (
              <ExpandLessIcon sx={{ color: "white" }} />
            ) : (
              <ExpandMore sx={{ color: "white" }} />
            )}
          </ListItem>
          <Collapse in={expandmenu} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                to="products"
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton sx={{ pl: 5 }}>
                  <ListItemText primary="All Products" />
                </ListItemButton>
              </Link>
            </List>
            <List component="div" disablePadding>
              <Link
                to="category"
                style={{ textDecoration: "none", color: "white" }}
              >
                <ListItemButton sx={{ pl: 5 }}>
                  <ListItemText primary="Category" />
                </ListItemButton>
              </Link>
            </List>
          </Collapse>

          <Link to="orders" style={{ textDecoration: "none", color: "white" }}>
            <ListItem sx={{ mt: 2, boxShadow: 2 }}>Orders</ListItem>
          </Link>
          <Link to="users" style={{ textDecoration: "none", color: "white" }}>
            <ListItem sx={{ mt: 2, boxShadow: 2 }}>Users</ListItem>
          </Link>
          <ListItem sx={{ mt: 2, boxShadow: 2 }}>
            <LogoutUser logout={handleLogout} />
          </ListItem>
        </List>
        <Divider />
        <List></List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Typography paragraph>
          <Outlet />
        </Typography>
      </Main>
    </Box>
  );
}
