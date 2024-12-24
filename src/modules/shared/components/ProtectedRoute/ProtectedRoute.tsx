import React from "react"
import { Navigate } from "react-router-dom"

type props = {
    children: React.ReactNode
}
export default function ProtectedRoute({children}: props) {
    const token = localStorage.getItem('token')
  return ( 
    <>
        {token ? children : <Navigate to={'/login'}/>}
    </>
  )
}
