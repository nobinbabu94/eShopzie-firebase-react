import { ThemeProvider, } from '@mui/system'
import theme, { colors } from "./Styles/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Flip, ToastContainer, Zoom, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//pages
import {
  Home, Contacts, About, Shop,
  Wishlist, Cart, Login, Register, Reset,
  OrdersAdmin, Products,
  Users, AddProduct, DashboardAdmin, HeaderAdmin, CategoryAdmin, CheckoutPage, CheckOutDetailsPage, CheckoutSuccessPage, ReviewProduct, OrderHistoryPage
} from './pages';

//component

import { Provider } from 'react-redux';
import store from './redux/Store';
import ViewProductModal from './components/ViewProductModal';

import AdminLogin from './components/admin/AdminLogin';
import PageNotFount from './components/PageNotFount';




function App() {
  const appStyle = {
    display: 'flex',
  }


  return (
    <>
      <BrowserRouter>
        <Provider store={store}>
          <ThemeProvider theme={theme} sx={appStyle}>

            <ToastContainer transition={Flip} toastStyle={{ backgroundColor: colors.darkBlue, color: 'white' }} 
            autoClose={100} theme="light" hideProgressBar={true} />
   {/* progressbar hided  */}
            <Routes>
              <Route path='*' element={<PageNotFount />} />
              <Route exact path='/' element={<Home />} />
              <Route path='/contacts' element={<Contacts />} />
              <Route path='/about' element={<About />} />
              <Route path="/shop/" element={<Shop />} >
                <Route path=":id" element={<ViewProductModal />} />
              </Route>
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/reset" element={<Reset />} />
              {/* <Route path="/myorders" element={<MyOrders />} /> */}
              <Route path='/order-history' element={<OrderHistoryPage />} />
              <Route path="/checkout-details" element={<CheckOutDetailsPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path='/checkout-success' element={<CheckoutSuccessPage />} />
              <Route path='/review/:id' element={<ReviewProduct />} />

              <Route index path='/admin-login' element={<AdminLogin />} />
              <Route path="/admin" element={<HeaderAdmin />} >
                <Route index element={<DashboardAdmin />} />
                <Route index path='home' element={<DashboardAdmin />} />
                <Route path="orders" element={<OrdersAdmin />} />
                {/* <Route path='order-details' element={<OrderDetails />} /> */}
                <Route path="products" element={<Products />} />
                <Route path="users" element={<Users />} />
                <Route path="add-products" element={<AddProduct />} />
                <Route path='category' element={<CategoryAdmin />} />
              </Route>


            </Routes>

          </ThemeProvider>
        </Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
