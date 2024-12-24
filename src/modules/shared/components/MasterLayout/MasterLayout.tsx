import { Outlet, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Navbar from "../Navbar/Navbar";
import SideBar from "../SideBar/SideBar";
import { useEffect, useState } from "react";

export default function MasterLayout() {
  const navigate = useNavigate()
  const [isAuth, setIsAuth] = useState(() => {
    const token = localStorage.getItem('token')
    if (token) return true
    else return false
  })

  useEffect(() => {
    if (!isAuth) {
      navigate('/login')
    }
  }, [])

  return (
    isAuth && <Box sx={{ display: 'flex' }}>
                  <Box>
                    <SideBar/>
                  </Box>
                  <Box sx={{ width: '100%' }}>
                    <Navbar/>
                    <Outlet/>
                  </Box>
                </Box>
  )
}
