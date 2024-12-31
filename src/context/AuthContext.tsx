import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { axiosInstance, USERS_URL } from "../services/EndPoints";

type props = {
    children: React.ReactNode
}

interface DecodedToken {
    _id: string
}

interface userData {
    userName: string,
    email: string,
    country: string,
    profileImage: string,
    role: string
}

interface AuthContextType {
    userData: userData | null,
    saveLoginData: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export default function AuthContextProvider({children}: props) {
    const [loginData, setLoginData] = useState<DecodedToken | null>(null)
    const [userData, setUsreData] = useState<userData | null>(null)

    const saveLoginData = () => {
        const token = localStorage.getItem('token')?.split(' ')[1]
        const decoded = jwtDecode(token)
        setLoginData(decoded)
    }    

    const getUserProfile = async () => {
        if (loginData?._id) {
          try {
            const res = await axiosInstance.get(USERS_URL.GET_USER_PROFILE(loginData._id));
            console.log(res);
            setUsreData(res?.data?.data?.user)
          } catch (error) {
            console.log(error);
          }
        }
      };

    useEffect(() => {
        if (localStorage.getItem('token')) {
            saveLoginData()   
        }
    }, []) 

    useEffect(() => {
        if (loginData) {
          getUserProfile();
        }
      }, [loginData]); 

    return (
        <AuthContext.Provider value={{userData, saveLoginData}}>
            {children}
        </AuthContext.Provider>
    )
}


export const UseAuthContext = () => {
    const authContext = useContext(AuthContext)
    if (authContext === null) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return authContext;
}