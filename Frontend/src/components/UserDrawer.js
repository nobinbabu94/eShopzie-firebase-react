import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import CreateIcon from '@mui/icons-material/Create';
import AvtarUser from './AvtarUser';
import KeyIcon from '@mui/icons-material/Key';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink } from 'react-router-dom';
import { colors } from '../Styles/theme';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { Collapse, Grid, List, ListItemButton, ListItemText } from '@mui/material';
import LogoutUser from './LogoutUser';
import ShowLogin, { ShowLogOut } from './HiddenLink';
import { selectUserName } from '../redux/slice/AuthSlice';
import { useSelector } from 'react-redux';

export default function UserDrawer() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const [expandmenu, setExpandmenu] = React.useState(false);



  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const NavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? colors.orange : "black",
      textDecoration: isActive ? "none" : "none",
      display: 'flex'
    };
  };

  const userName = useSelector(selectUserName)

  return (
    <React.Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', }}>

        <Tooltip title="User">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <AvtarUser sx={{ width: 32, height: 32, }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            bgcolor: colors.darkBlue,
            border: '2px solid',
            borderColor: colors.primary, boxShadow: '2', borderRadius: 5,
            width: '200px',
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <Grid sx={{ width: '100%', }} >
          <ShowLogin>
            <MenuItem sx={{ mb: 0, width: '100%', }} >

              <Avatar>
                <AccountCircleIcon sx={{ color: colors.darkBlue }} />
              </Avatar>
              <Typography
                sx={{
                  mb: 2, pt: 2, width: '70%', overflow: 'hidden', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'start'
                }}
                align="center"
              >
                {userName}
              </Typography>

              <Grid align="center" justify="center" sx={{ display: 'flex', width: '10%', }}>
                {
                  expandmenu ?
                    <ExpandLessIcon sx={{ color: 'white' }} onClick={() => setExpandmenu(false)}
                    /> :
                    <ExpandMore sx={{ color: 'white' }}
                      onClick={() => setExpandmenu(!expandmenu)}
                    />
                }
              </Grid>
            </MenuItem>
          </ShowLogin>
        </Grid>
        <Collapse in={expandmenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItemButton sx={{ pl: 7, pt: 0 }}>

              <NavLink to='/order-history' style={NavLinkStyle}>
                <ListItemText sx={{ color: 'white' }} primary="Order History" />
              </NavLink>
            </ListItemButton>
          </List>
        </Collapse>
        <ShowLogOut>
          <NavLink to='/login' style={NavLinkStyle}>
            <MenuItem >
              <Avatar>
                <KeyIcon sx={{ color: colors.darkBlue }} />
              </Avatar>
              <Typography sx={{ color: 'white' }}>
                Login</Typography>
            </MenuItem>
          </NavLink>
        </ShowLogOut>
        <ShowLogOut>
          <NavLink to='/register' style={NavLinkStyle}>
            <MenuItem>
              <Avatar ><CreateIcon sx={{ color: colors.darkBlue }} />
              </Avatar><Typography sx={{ color: 'white' }}> Register</Typography>
            </MenuItem>
          </NavLink>
        </ShowLogOut>
        <Divider />


        <ShowLogin>
          <MenuItem >

            <LogoutUser />
          </MenuItem>
        </ShowLogin>
      </Menu>
    </React.Fragment>
  );
}
