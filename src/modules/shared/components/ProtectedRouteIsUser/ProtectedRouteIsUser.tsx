import { Navigate } from "react-router-dom";
import { UseAuthContext } from "../../../../context/AuthContext"
import React from "react";

interface props {
    children: React.ReactNode
}

export default function ProtectedRouteIsUser({children}: props) {
    const token = localStorage.getItem('token')
    const {userData} = UseAuthContext()
    console.log(userData);
    
  return (
    token && userData?.role === 'user' ? children : <Navigate to={'/auth/login'}/>
  )
}
