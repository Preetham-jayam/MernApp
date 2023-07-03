import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css'
import {createBrowserRouter,createRoutesFromElements,Route,RouterProvider} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import './assets/styles/index.css';
import './assets/styles/bootstrap.custom.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/cartPage.jsx';

const router=createBrowserRouter(
  createRoutesFromElements(
  <Route path='/' element={<App/>}>
    <Route index={true} path='/' element={<HomePage/>}/>
    <Route path='/product/:id' element={<ProductPage/>}/>
    <Route path='/cart' element={<CartPage/>}></Route>
  </Route>
));
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
   </Provider>
  </React.StrictMode>
);


reportWebVitals();
