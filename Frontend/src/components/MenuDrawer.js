import React, { useState } from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import ShopIcon from '@mui/icons-material/Shop';
import KeyIcon from '@mui/icons-material/Key';
import Divider from '@mui/material/Divider';
import RoomIcon from '@mui/icons-material/Room';
import FeedIcon from '@mui/icons-material/Feed';
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Grid, MenuItem, MenuList, Typography } from '@mui/material';
import { colors } from '../Styles/theme';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AvtarCart from './AvtarCart';
import AvtarWishlist from './AvtarWishlist';
import { NavLink } from 'react-router-dom';
import LogoutUser from './LogoutUser';
import { selectUserName } from '../redux/slice/AuthSlice';
import { useSelector } from 'react-redux';
import ShowLogin, { ShowLogOut } from './HiddenLink';

export default function MenuDrawer() {

  const [open, setOpen] = useState(false);
  const [state, setState] = useState({
    right: false,
  });

  const userName = useSelector(selectUserName)


  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const NavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? colors.orange : 'white',
      textDecoration: isActive ? 'none' : 'none', height: 40, boxShadow: 15
    }
  }

  const list = (anchor) => (
    <Box
      sx={{ mt: 4, width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 200 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Grid sx={{ width: '100%' }}>
        <ShowLogin>
          <MenuItem
            sx={{ gap: 1, color: 'white', "&: hover": { color: 'orange' }, }}
            onClick={handleClick}
          >
            < PersonIcon />
            <Typography sx={{ overflow: 'hidden' }}>{userName}</Typography>
            {open ? <ExpandMoreIcon /> : <ExpandLessIcon />}
          </MenuItem>
        </ShowLogin>
        <ShowLogOut>
          <NavLink
            style={NavLinkStyle}
            to="/login"
          >
            <MenuItem sx={{ gap: 1, "&: hover": { color: 'orange' } }}><KeyIcon />Login
            </MenuItem>
          </NavLink>
        </ShowLogOut>
      </Grid>
      <Divider />
      <MenuList sx={{ display: 'flex', flexDirection: 'column', mt: 2, height: 150 }}>
        <NavLink
          style={NavLinkStyle}
          to="/"
        >
          <MenuItem sx={{ gap: 1, "&: hover": { color: 'orange' } }}><HomeIcon />Home
          </MenuItem>
        </NavLink>
        <NavLink
          style={NavLinkStyle}
          to="/shop"
        >
          <MenuItem sx={{ gap: 1, "&: hover": { color: 'orange' } }}><ShopIcon />Shop
          </MenuItem>
        </NavLink>
        <NavLink
          style={NavLinkStyle}
          to="/about"
        >
          <MenuItem sx={{ gap: 1, "&: hover": { color: 'orange' } }}><FeedIcon />About
          </MenuItem>
        </NavLink>
        <NavLink
          style={NavLinkStyle}
          to="/contacts"
        >
          <MenuItem sx={{ gap: 1, "&: hover": { color: 'orange' } }}><RoomIcon />Contact us
          </MenuItem>
        </NavLink>

      </MenuList>
      <Divider />
      <MenuList sx={{ display: 'flex', flexDirection: 'column', mt: '-5px', p: 0 }}>

        <NavLink
          style={NavLinkStyle}
          to="/wishlist"
        >
          <MenuItem sx={{ gap: 1, "&: hover": { color: 'orange', } }}>
            <AvtarWishlist />
            Wishlist
          </MenuItem>
        </NavLink>
        <NavLink
          style={NavLinkStyle}
          to="/cart"
        >
          <MenuItem sx={{ gap: 1, "&: hover": { color: 'orange' } }}>
            <AvtarCart />
            Cart
          </MenuItem>
        </NavLink>
        <MenuList sx={{ display: 'flex', flexDirection: 'column', color: 'white' }}>
          <ShowLogin>
            <MenuItem
              sx={{ m: '-5px', "&: hover": { backgroundColor: colors.darkBlue, color: colors.primary } }}>
              <LogoutUser />
            </MenuItem>
          </ShowLogin>
        </MenuList>
      </MenuList>
      <Divider />

    </Box>
  );

  return (
    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} sx={{ color: 'white' }}><MenuIcon /></Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: 'border-box', borderRight: '0px',
                backgroundColor: colors.darkBlue
              }
            }}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
