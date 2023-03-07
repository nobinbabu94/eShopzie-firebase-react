import React, { useEffect } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { colors } from '../Styles/theme';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { CALCULATE_TOTAL_ITEMS, selectCartItems, selectcartTotalQuantity } from '../redux/slice/cartSlice';
import { useDispatch } from 'react-redux';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 5,
    border: '2px solid',
    padding: '0 4px',
  },
}));



export default function AvtarCart() {

  const dispatch = useDispatch()
  const cartItems = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectcartTotalQuantity)
  const NavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? colors.orange : 'white',
      textDecoration: isActive ? 'none' : 'none'
    }
  }
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_ITEMS())
  }, [cartItems,dispatch])



  return (

    <IconButton aria-label="cart" >
      <NavLink to='/cart' style={NavLinkStyle} >
        <StyledBadge badgeContent={`${totalQuantity}`} color={colors.white}>
          <ShoppingCartIcon sx={{ marginLeft: '-8px' }} />
        </StyledBadge>
      </NavLink >
    </IconButton>

  );
}
