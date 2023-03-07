import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filterProducts: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    FILTER_BY_SEARCH(state, action) {
    
      const { productdata, search } = action.payload;
      const tempProduct = productdata.filter(
        (product) =>
          product.name.toLowerCase().includes(search.toLowerCase()) ||
          product.brand.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase())
      );
      state.filterProducts = tempProduct;
    },
    SORT_PRODUCTS(state, action) {

      const { sort, productdata } = action.payload;
      let tempProduct = [];
      if (sort === "Latest") {
        tempProduct = productdata;
      }
      if (sort === "Lowest Price") {
        tempProduct = productdata.slice().sort((a, b) => {
          return a.price - b.price;
        });
      }
      if (sort === "Highest Price") {
        tempProduct = productdata.slice().sort((a, b) => {
          return b.price - a.price;
        });
      }
      if (sort === "A - Z") {
        tempProduct = productdata.slice().sort((a, b) => {
          return a.name.localeCompare(b.name);
        });
      }
      if (sort === "Z - A") {
        tempProduct = productdata.slice().sort((a, b) => {
          return b.name.localeCompare(a.name);
        });
      }

      state.filterProducts = tempProduct;
    },

    FILTER_BY_CATEGORY(state,action){
      const { catValue, productdata} = action.payload
      let tempProduct =[]
      tempProduct=productdata.filter((cat)=>cat.category===catValue) 
     
      tempProduct.length ===0 ? state.filterProducts = productdata :state.filterProducts = tempProduct
      // state.filterProducts = tempProduct

    },

    FILTER_BY_PRICE(state,action) {
     
      const { productdata, value} = action.payload
      let tempProduct =[]
      tempProduct= productdata.filter((product)=>product.price<=value) 
      state.filterProducts = tempProduct
    },
  },
});

export const { FILTER_BY_SEARCH, SORT_PRODUCTS, FILTER_BY_PRICE ,
  FILTER_BY_CATEGORY} =
  filterSlice.actions;

export const selectFilterProduct = (state) => state.filter.filterProducts;

export default filterSlice.reducer;
