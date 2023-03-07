import {configureStore,combineReducers, getDefaultMiddleware} from "@reduxjs/toolkit"
import AuthReducer from './slice/AuthSlice'
import ProductReducer from './slice/ProductSlice'
import cartReducer from './slice/cartSlice'
import CheckoutReducer from './slice/CheckoutSlice'
import orderReducer from './slice/OrderSlice'
import wishlistReducer from './slice/WishlistSlice'
import filterReducer from './slice/filterSlice'

const rootReducer = combineReducers({
    auth : AuthReducer, 
    product : ProductReducer, 
    cart :cartReducer,
    checkout :CheckoutReducer,
    orders : orderReducer, 
    wishlist : wishlistReducer,
    filter : filterReducer

   
})

const store = configureStore({
    reducer:rootReducer,
    middleware: (getDefaultMiddleware({serializableCheck:false}))
})

export default store;