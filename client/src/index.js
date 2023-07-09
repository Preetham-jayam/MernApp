import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import {PayPalScriptProvider} from '@paypal/react-paypal-js'
import { Provider } from 'react-redux';
import store from './store.js';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute.jsx';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/cartPage.jsx';
import LoginScreen from './pages/LoginScreen.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import Shippingpage from './pages/Shippingpage.jsx';
import Paymentpage from './pages/Paymentpage.jsx';
import PlaceOrderPage from './pages/PlaceOrderPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import AdminRoute from './components/AdminRoute.jsx';
import OrderListsPage from './pages/Admin/OrderListsPage.jsx';
import ProductListPage from './pages/Admin/ProductListPage.jsx';
import ProductEditpage from './pages/Admin/ProductEditPage.jsx';
import UserListPage from './pages/Admin/UsersListPage.jsx';
import UserEditPage from './pages/Admin/UserEditPage.jsx';
const router=createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<HomePage/>}/>
    <Route path='/product/:id' element={<ProductPage/>}/>
    <Route path='/cart' element={<CartPage/>}></Route>
    <Route path='/login' element={<LoginScreen/>}></Route>
    <Route path='/register' element={<RegisterPage />} />
    <Route path='' element={<PrivateRoute/>}>
     <Route path='/shipping' element={<Shippingpage/>}></Route>
     <Route path='/payment' element={<Paymentpage/>} ></Route>
     <Route path='/placeorder' element={<PlaceOrderPage />} />
     <Route path='/order/:id' element={<OrderPage/>}></Route>
     <Route path='/profile' element={<ProfilePage/>}></Route>
    </Route>

    <Route path='' element={<AdminRoute/>}>
      <Route path='/admin/orderlist' element={<OrderListsPage/>}></Route>
      <Route path='/admin/productlist' element={<ProductListPage/>}></Route>
      <Route path='/admin/product/:id/edit' element={<ProductEditpage/>}></Route>
      <Route path='/admin/userlist' element={<UserListPage/>}></Route>
      <Route path='/admin/user/:id/edit' element={<UserEditPage/>}></Route>
    </Route>
  </Route>
));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true} >
       <RouterProvider router={router}/>
      </PayPalScriptProvider>
   </Provider>
  </React.StrictMode>
);


reportWebVitals();
