import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from "./Pages/MainLayout/MainLayout";
import Products from "./Pages/Products/Products";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import TokenContextProvider from './Context/TokenContext';
import Cart from './Pages/Cart/Cart';
import Categories from './Pages/Categories/Categories';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProductDetails from './Pages/ProductDetails/ProductDetails';
import NotFound from './Pages/NotFound/NotFound';
import { Offline, Online } from 'react-detect-offline';
import { CiWifiOff } from 'react-icons/ci';
import Brands from './Pages/Brands/Brands';
import ForgetPassword from './Pages/ForgetPassword/ForgetPassword';
import VerificationCode from './Pages/ForgetPassword/VerificationCode';
import ResetPassword from './Pages/ForgetPassword/ResetPassword';
import CartContextProvider from './Context/CartContext';
import { Toaster } from './../node_modules/react-hot-toast/src/components/toaster';
import CheckOut from './Pages/CheckOut/CheckOut';
import AllOrders from './Pages/AllOrders/AllOrders';
import WishListContextProvider from './Context/WishListContext';
import WishList from './Pages/WishList/WishList';
import { QueryClientProvider ,QueryClient } from '@tanstack/react-query';


const query = new QueryClient();

export default function App() {

  const routes = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          index: true, element: (
            <ProtectedRoutes> <Home />{' '}</ProtectedRoutes>

          )
        },
        { path: "products", element: (<ProtectedRoutes><Products /></ProtectedRoutes>) },
        { path: "cart", element: (<ProtectedRoutes><Cart /></ProtectedRoutes>) },
        { path: "categories", element: (<ProtectedRoutes><Categories /></ProtectedRoutes>) },
        { path: "productdetails/:productId", element: (<ProtectedRoutes><ProductDetails /></ProtectedRoutes>) },  //dynamicroutes
        { path: "brands", element: (<ProtectedRoutes><Brands /></ProtectedRoutes>) },
        { path: "checkout", element: (<ProtectedRoutes><CheckOut /></ProtectedRoutes>) },
        { path: "allorders", element: (<ProtectedRoutes><AllOrders /></ProtectedRoutes>) },
        { path: "wishlist", element: (<ProtectedRoutes><WishList /></ProtectedRoutes>) },



        { path: "Login", element: <Login /> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "verificationcode", element: <VerificationCode /> },
        { path: "resetrassword", element: <ResetPassword /> },
        { path: "Register", element: <Register /> },
        { path: '*', element: <NotFound /> }
      ]
    }
  ])

  return (

    <QueryClientProvider client={query}>

      <TokenContextProvider>
        <CartContextProvider>
          <WishListContextProvider>

            <Offline>
              {' '}
              <div className='offline fixed bottom-2 right-4 bg-green-100 p-3 font-semibold rounded z-50'>
                <CiWifiOff className='inline mx-3 text-xl' />
                You Are Now Offline!
              </div>
            </Offline>
            <Toaster />

            <RouterProvider router={routes}></RouterProvider>
          </WishListContextProvider>

        </CartContextProvider>
      </TokenContextProvider>

    </QueryClientProvider>





  );


}
