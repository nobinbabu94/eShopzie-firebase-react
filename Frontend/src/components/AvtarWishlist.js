import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { colors } from '../Styles/theme';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CALCULATE_TOTAL_WISHLIST_ITEMS, CALCULATE_WISHLIST_TOTAL_AMOUNT, selectwishlistItems, selectwishlistTotalQuantity } from '../redux/slice/WishlistSlice';
import { useEffect } from 'react';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 0,
    top: 5, 
    border: '2px solid' ,
    padding: '0 4px',
  },
}));

export default function AvtarWishlist() {
  const dispatch= useDispatch()
  const totalQuantity = useSelector(selectwishlistTotalQuantity)
  const wishlistItems = useSelector(selectwishlistItems);


  useEffect(() => {
    dispatch(CALCULATE_TOTAL_WISHLIST_ITEMS())
  }, [totalQuantity,dispatch])

  const NavLinkStyle = ({ isActive }) => {
    return {
      color: isActive ? colors.orange : 'white',
      textDecoration: isActive ? 'none' : 'none'
    }
  }
  useEffect(() => {
    dispatch(CALCULATE_TOTAL_WISHLIST_ITEMS());
    dispatch(CALCULATE_WISHLIST_TOTAL_AMOUNT());
  }, [dispatch, wishlistItems]);
  return (
    <IconButton aria-label="cart" >
      <NavLink to='/wishlist' style={NavLinkStyle} >
        <StyledBadge badgeContent={`${totalQuantity}`} >
          <FavoriteIcon sx={{ marginLeft: '-8px' }} />
        </StyledBadge>
      </NavLink>
    </IconButton>
  );
}
