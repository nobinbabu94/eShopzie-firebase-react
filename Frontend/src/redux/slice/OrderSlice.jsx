import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],
  totalOrderAmount: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
     
      state.orderHistory = action.payload;
    },
    CALCULATE_ORDER_AMOUNT(state, action) {
      const array = [];
      state.orderHistory.map((item) => {
        const { orderAmount } = item;

        
        return array.push(orderAmount);
      });
      
      //array reduce method have 2 parameters and will return all the values to be calculated, initial value 0

      const totalAmount = array.reduce((a, b) => {
        return a + b;
      }, 0);
      state.totalOrderAmount = totalAmount;
    },
  },
});

export const { STORE_ORDERS, CALCULATE_ORDER_AMOUNT } = OrderSlice.actions;

export const selectOrderHistory = (state) => state.orders.orderHistory;
export const selectTotalOrderAmount = (state) => state.orders.totalOrderAmount;

export default OrderSlice.reducer;
