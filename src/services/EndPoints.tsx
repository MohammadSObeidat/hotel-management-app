import axios from "axios"

const baseURL = 'https://upskilling-egypt.com:3000/api/v0'
export const imageBaseURL = 'https://upskilling-egypt.com:3000'

// Public URL
export const axiosInstanceURL = axios.create({baseURL: baseURL})

// Privet URL
export const axiosInstance = axios.create({baseURL: baseURL})

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `${token}`;
  
    return config;
});

// User Endpoints
export const USERS_URL = {
    LOGIN: `/admin/users/login`,
    FORGOT_PASSWORD: `/portal/users/forgot-password`,
    RESET_PASSWORD: `/admin/users/reset-password`,
    REGISTER: `/portal/users`,
    GET_USER_PROFILE: (id: string) => `/admin/users/${id}`,
    GET_USERS: `/admin/users`
}

// Room Endpoints 
export const ROOMS_URL = {
    GET_ROOMS: `/admin/rooms`,
    CREATE_ROOM: `/admin/rooms`,
    GET_ROOM: (id: string) => `/admin/rooms/${id}`,
    DELETE_ROOM: (id: number) => `/admin/rooms/${id}`,
    UPDATE_ROOM: (id: string) => `/admin/rooms/${id}`
}

// Facilities Endpoints
export const FACILITIES_URL = {
    GET_FACILITIES: `/admin/room-facilities`,
    GET_FACILITY: (id: number) => `/admin/room-facilities/${id}`,
    CREATE_FACILITY: `/admin/room-facilities`,
    DELETE_FACILITY: (id: number) => `/admin/room-facilities/${id}`,
    UPDATE_FACILITY: (id: number) => `/admin/room-facilities/${id}`
}

// Ads Endpoints
export const ADS_URL = {
    GET_ADS: `/admin/ads`,
    CREATE_ADS: `/admin/ads`,
    DELETE_ADS: (id: number) => `/admin/ads/${id}`,
    UPDATE_ADS: (id: number) => `/admin/ads/${id}`,
    GET_ONE_ADS: (id:number) => `/admin/ads/${id}`
}

// Booking Endpoints
export const BOOKING_URL = {
    GET_BOOKING: `/admin/booking`,
    DETAILS_BOOKING: (id: number) => `/admin/booking/${id}`
}