import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AuthLayout from './modules/shared/components/AuthLayout/AuthLayout';
import Login from './modules/authentication/components/Login/Login';
import Register from './modules/authentication/components/Register/Register';
import ForgotPassword from './modules/authentication/components/ForgotPassword/ForgotPassword';
import ResetPassword from './modules/authentication/components/ResetPassword/ResetPassword';
import NotFound from './modules/shared/components/NotFound/NotFound';
import MasterLayout from './modules/shared/components/MasterLayout/MasterLayout';
import Dashboard from './modules/Dashboard/components/Dashboard/Dashboard';
import RoomLists from './modules/rooms/components/RoomLists/RoomLists';
import RoomForm from './modules/rooms/components/RoomForm/RoomForm';
import FacilitiesList from './modules/facilities/components/FacilitiesList/FacilitiesList';
import AdsList from './modules/ads/components/AdsList/AdsList';
import BookingList from './modules/booking/components/BookingList/BookingList';
import UsersList from './modules/users/components/UsersList/UsersList';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './modules/shared/components/ProtectedRoute/ProtectedRoute';
import UserLayout from './modules/shared/components/UserLayout/UserLayout';
import HomePage from './modules/homePage/components/HomePage/HomePage';
import Explore from './modules/explore/components/Explore';
import DetailsPage from './modules/detailsPage/components/DetailsPage/DetailsPage';
import Favorites from './modules/shared/components/favorites/components/Favorites/Favorites';
import Payment from './modules/payment/components/Payment/Payment';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import PaymentDone from './modules/paymentDone/components/PaymentDone/PaymentDone';
import ProtectedRouteIsUser from './modules/shared/components/ProtectedRouteIsUser/ProtectedRouteIsUser';

const stripePromise = loadStripe('pk_test_51OTjURBQWp069pqTmqhKZHNNd3kMf9TTynJtLJQIJDOSYcGM7xz3DabzCzE7bTxvuYMY0IX96OHBjsysHEKIrwCK006Mu7mKw8');


function App() {
  const router = createBrowserRouter([
    {
      path: '/auth',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Login/>},
        {path: '/auth/login', element: <Login/>},
        {path: '/auth/register', element: <Register/>},
        {path: '/auth/forgot-password', element: <ForgotPassword/>},
        {path: '/auth/reset-password', element: <ResetPassword/>}
      ]
    },
    {
      path: '/',
      element: <UserLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <HomePage/>},
        {path: 'home', element: <HomePage/>},
        {path: 'explore-all-rooms', element: <Explore/>},
        {path: 'details-page/:roomId', element: <DetailsPage/>},
        {path: 'favorites', element: <ProtectedRouteIsUser><Favorites/></ProtectedRouteIsUser>},
        {path: 'payment', element: <Elements stripe={stripePromise}> <ProtectedRouteIsUser><Payment/></ProtectedRouteIsUser> </Elements>},
        {path: 'payment-done', element: <ProtectedRouteIsUser><PaymentDone/></ProtectedRouteIsUser>}
      ]
    },
    {
      path: '/',
      element:  <ProtectedRoute>
                  <MasterLayout/>
                </ProtectedRoute>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Dashboard/>},
        {path: 'dashboard', element: <Dashboard/>},
        {path: 'rooms', element: <RoomLists/>},
        {path: 'rooms/:roomId', element: <RoomForm/>},
        {path: 'facilities', element: <FacilitiesList/>},
        {path: 'ads', element: <AdsList/>},
        {path: 'booking', element: <BookingList/>},
        {path: 'users', element: <UsersList/>}
      ]
    }
  ])

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App
