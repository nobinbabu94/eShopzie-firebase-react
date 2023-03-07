import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    billingAddress : {}
};

const CheckoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    SAVE_BILLING_ADDRESS(state,action){
        state.billingAddress = action.payload
    }

  },
});

export const {SAVE_BILLING_ADDRESS} = CheckoutSlice.actions;

export const selectBillingAddress = (state) => state.checkout.billingAddress

export default CheckoutSlice.reducer;
