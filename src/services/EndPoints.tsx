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

// =============== Admin Portal ====================

// User Endpoints
export const USERS_URL = {
    LOGIN: `/admin/users/login`,
    FORGOT_PASSWORD: `/portal/users/forgot-password`,
    RESET_PASSWORD: `/admin/users/reset-password`,
    REGISTER: `/portal/users`,
    GET_USER_PROFILE: (id: string) => `/admin/users/${id}`,
    GET_USERS: `/admin/users`,
    CHANGE_PASSWORD: `/admin/users/change-password`
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

// Dashboard Endpoint
export const DASHBOARD_URL = {
    CHART: `/admin/dashboard`
}

// =============== User Portal ===================

export const ROOM_URL_USER = {
    GET_ROOMS: `/portal/rooms/available`,
    GET_ROOM: (id: string | undefined) => `/portal/rooms/${id}`,
    CREATE_COMMENT: `/portal/room-comments`,
    RATE_ROOM: `/portal/room-reviews`
}

export const FAVORITE_ROOMS = {
    GET_FAVORITE_ROOMS: `/portal/favorite-rooms`,
    ADD_TO_FAVORITE: `/portal/favorite-rooms`,
    REMOVE_FAVORITE: (id: string) => `/portal/favorite-rooms/${id}`
}

export const ADS_URL_USER = {
    GET_ADS: `/portal/ads`,
}

export const BOOKING_URL_USER = {
    CREATE_BOOKING: `/portal/booking`,
    PAY_BOOKING: (id: string) => `/portal/booking/${id}/pay`
}