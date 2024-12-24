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

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <AuthLayout/>,
      errorElement: <NotFound/>,
      children: [
        {index: true, element: <Login/>},
        {path: 'login', element: <Login/>},
        {path: 'register', element: <Register/>},
        {path: 'forgot-password', element: <ForgotPassword/>},
        {path: 'reset-password', element: <ResetPassword/>}
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
