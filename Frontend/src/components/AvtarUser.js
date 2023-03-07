import * as React from 'react';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Stack from '@mui/material/Stack';



export default function AvtarUser() {
  // const NavLinkStyle = ({ isActive }) => {
  //   return {
  //     color: isActive ? colors.orange : 'white',
  //     textDecoration: isActive ? 'none' : 'none'
  //   }
  // }
  return (
    <Stack direction="row" spacing={2}>

      <AccountCircleRoundedIcon sx={{ fontSize: '1.9rem', color: 'white', marginLeft: '-10px' }}
        alt="Travis Howard" src="/broken-image.jpg" />

    </Stack>
  );
}