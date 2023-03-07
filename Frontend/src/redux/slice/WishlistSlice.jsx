import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  wishlistItems: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
  wishlistTotalQuantity: 0,
  wishlistTotalAmount: 0,
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    ADD_TO_WISHLIST(state, action) {
      const productIndex = state.wishlistItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (productIndex >= 0) {
        //item is already in cart
        //increase the cart Qantity
        // state.wishlistItems[productIndex].cartQuantity += 1;
        toast.info(`${action.payload.name} Already in wishlist`);
      } else {
        //intem is not in the cart
        //add item to cart
        const tempProduct = { ...action.payload, wishlistQuantity: 1 };
        state.wishlistItems.push(tempProduct);
        toast.success(
          `${action.payload.name} added to wishlist successfully `,
          {
            position: "top-left",
          }
        );
      }

      //save card to local storage
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    DELETE_FROM_WISHLIST(state, action) {
      const newwishlistItem = state.wishlistItems.filter(
        (item) => item.id !== action.payload.id
      );
      state.wishlistItems = newwishlistItem;

      toast.success(`${action.payload.name} removed from cart`);
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },
    CLEAR_WISHLIST(state, action) {
      state.wishlistItems = [];
      toast.info("Cart cleared");
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(state.wishlistItems)
      );
    },

    CALCULATE_WISHLIST_TOTAL_AMOUNT(state, action) {
      const array = [];
      state.wishlistItems.map((item) => {
        const { price, cartQuantity } = item;
        const cartItemAmount = price * cartQuantity;
        return array.push(cartItemAmount);
      });
      //array reduce method have 2 parameters and will return all the values to be calculated, initial value 0

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.wishlistTotalAmount = totalAmount;
    },

    CALCULATE_TOTAL_WISHLIST_ITEMS(state, action) {
      const wishlistArray = [];
      state.wishlistItems.map((item) => {
        const { cartQuantity } = item;
        const quantity = cartQuantity;

        return wishlistArray.push(quantity);
      });

      //array reduce method have 2 parameters and will return all the values to be calculated, initial value 0
      const wishlistToatalItem = wishlistArray.length;
      // const totalQuantity = wishlistArray.reduce((a, b) => {
      //   return a + b;
      // }, 0);
      state.wishlistTotalQuantity = wishlistToatalItem;
    },
  },
});

export const {
  ADD_TO_WISHLIST,
  DELETE_FROM_WISHLIST,
  CLEAR_WISHLIST,
  CALCULATE_WISHLIST_TOTAL_AMOUNT,
  CALCULATE_TOTAL_WISHLIST_ITEMS,
} = wishlistSlice.actions;

export const selectwishlistItems = (state) => state.wishlist.wishlistItems;
export const selectwishlistTotalQuantity = (state) =>
  state.wishlist.wishlistTotalQuantity;
export const selectwishlistTotalAmount = (state) =>
  state.wishlist.wishlistTotalAmount;

export default wishlistSlice.reducer;
